<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\InboundDelivery;
use App\Models\Location;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
use App\Services\ProductService;
use App\Services\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GoodsReceiptController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $this->authorize('viewAll', GoodsReceipt::class);

    return Inertia::render('Inbound/GoodsReceipt/Index', [
      'receipts' => GoodsReceipt::with(['client:id,name', 'supplier:id,name', 'warehouse:id,name'])->orderBy('updated_at', 'desc')->get(),
      'warehouses' => Warehouse::all(['id', 'name', 'description']),
      'clients' => Vendor::where('type', 'C')->get(),
      'suppliers' => Vendor::where('type', 'S')->get(),
      'products' => Product::all(['id', 'name', 'description', 'baseUom']),
      'query' => request()->all('inboundNo')
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $this->authorize('create', GoodsReceipt::class);

    return Inertia::render('Inbound/GoodsReceipt/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $this->authorize('create', GoodsReceipt::class);

    $validated = $request->validate([
      'client' => 'required|exists:vendors,id',
      'warehouse' => 'required|exists:warehouses,id',
      'supplier' => 'required|exists:vendors,id',
      'inboundNo' => 'sometimes|exists:inbound_deliveries,inboundNo',
      'grDate' => 'required',
      'products' => 'required|array',
    ]);

    $goodsReceipt = new GoodsReceipt($validated);

    $count = GoodsReceipt::where('grDate', '=', $validated['grDate'])->count();
    $goodsReceipt->grNo = Utils::generateIncrementNo($validated['grDate'], $count, 1);

    $goodsReceipt->client()->associate($validated['client']);
    $goodsReceipt->supplier()->associate($validated['supplier']);
    $goodsReceipt->warehouse()->associate($validated['warehouse']);

    $goodsReceipt->save();

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);


    $goodsReceipt->products()->attach($nProducts);
    $goodsReceipt->save();

    return Redirect::route('inbound.receipt.index');
  }

  public function fromInbound(Request $request)
  {
    $this->authorize('create', GoodsReceipt::class);

    $validated = $request->validate([
      'inboundIds' => 'required|array',
      'grDate' => 'required',
    ]);

    $inbounds = InboundDelivery::with(['products:id'])->whereIn('id', $validated['inboundIds'])->get();

    $count = GoodsReceipt::where('grDate', '=', $validated['grDate'])->count();


    $index = 0;
    foreach ($inbounds as $inbound) {
      $goodsReceipt = new GoodsReceipt([
        'inboundNo' => $inbound->inboundNo,
        'grDate' => $validated['grDate'],
      ]);

      $goodsReceipt->grNo = Utils::generateIncrementNo($validated['grDate'], $count + $index, 1);
      $goodsReceipt->client()->associate($inbound->client);
      $goodsReceipt->supplier()->associate($inbound->supplier);
      $goodsReceipt->warehouse()->associate($inbound->warehouse);

      $goodsReceipt->save();

      $products = $inbound->products->map->pivot;
      $nProducts = $products->keyBy('product_id');
      $nProducts->transform(function ($item, $key) {
        return $item->only(['name', 'description', 'baseUom', 'price', 'quantity', 'amount']);
      });

      $goodsReceipt->products()->attach($nProducts->toArray());
      $goodsReceipt->save();


      $inbound->status = 'CLOSE';
      $inbound->save();

      $index++;
    }

    return Redirect::route('inbound.delivery.index');
  }

  public function show(GoodsReceipt $receipt)
  {
    $this->authorize('view', $receipt);

    $receipt = $receipt->load(['client:id,name,description', 'supplier:id,name,description', 'warehouse:id,name,description']);
    $products = $receipt->products->map->pivot;

    $receipt = $receipt->toArray();
    $receipt['products'] = $products->toArray();

    return response()->json([
      'receipt' => $receipt
    ]);
  }


  public function update(Request $request, GoodsReceipt $receipt)
  {
    $this->authorize('update', $receipt);

    $validated = $request->validate([
      'client' => 'required|exists:vendors,id',
      'warehouse' => 'required|exists:warehouses,id',
      'supplier' => 'required|exists:vendors,id',
      'inboundNo' => 'sometimes|exists:inbound_deliveries,inboundNo',
      'grDate' => 'required',
      'products' => 'required|array',
    ]);

    $receipt->client()->associate($validated['client']);
    $receipt->supplier()->associate($validated['supplier']);
    $receipt->warehouse()->associate($validated['warehouse']);

    $receipt->save();

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $receipt->products()->sync($nProducts);
    $receipt->save();

    return Redirect::route('inbound.receipt.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $this->authorize('delete', $id);

    $ids = explode(',', $id);
    GoodsReceipt::whereIn('id', $ids)->delete();
    return Redirect::route('inbound.receipt.index');
  }

  public function getPutawayList(Request $request)
  {
    $validated = $request->validate([
      'goodsReceiptIds' => 'required|array'
    ]);


    $goodsReceipts = GoodsReceipt::with(['products', 'warehouse:id,name,description', 'client:id,name'])->whereIn('id', $validated['goodsReceiptIds'])->get();
    $goodsReceiptsByWarehouse = $goodsReceipts->groupBy('warehouse_id');

    // Get all location
    $locations = Location::whereIn('warehouse_id', $goodsReceiptsByWarehouse->keys())->get()->groupBy('warehouse_id');


    // dd($goodsReceiptsByWarehouse->toArray());

    return response()->json(['goodsReceiptsByWarehouse' => $goodsReceiptsByWarehouse, 'locations' => $locations]);
  }

  public function toPutaway(Request $request)
  {
    $this->authorize('create', GoodsReceipt::class);

    $validated = $request->validate([
      'inventories' => 'required|array'
    ]);
  }
}
