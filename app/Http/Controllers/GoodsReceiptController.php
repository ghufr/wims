<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\Product;
use App\Models\Vendor;
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
      'receipts' => GoodsReceipt::with(['client:id,name', 'supplier:id,name', 'warehouse:id,name'])->get()
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

    return Inertia::render('Inbound/GoodsReceipt/Create', [
      'can' => [
        'edit_GoodsReceipt' => true
      ]
    ]);
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
      'client' => 'required|exists:vendors,name',
      'supplier' => 'required|exists:vendors,name',
      'inboundNo' => 'sometimes|exists:inbound_deliveries,inboundNo',
      'grDate' => 'required',
      'products' => 'required|array',
    ]);

    $goodsReceipt = new GoodsReceipt($validated);

    $client = Vendor::where('name', $validated['client'])->firstOrFail();
    $supplier = Vendor::where('name', $validated['supplier'])->firstOrFail();

    $count = GoodsReceipt::where('grDate', '=', $validated['grDate'])->count();
    $goodsReceipt->grNo = Utils::generateIncrementNo($validated['grDate'], $count, 1);

    $goodsReceipt->client()->associate($client);
    $goodsReceipt->supplier()->associate($supplier);
    $goodsReceipt->save();

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $goodsReceipt->products()->attach($nProducts);
    $goodsReceipt->save();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $this->authorize('view', GoodsReceipt::class);

    $receipt = GoodsReceipt::where('id', $id)->with(['client:id,name', 'supplier:id,name', 'warehouse:id,name'])->firstOrFail();
    $products = $receipt->products->map->pivot;

    $receipt = $receipt->toArray();
    $receipt['products'] = $products->toArray();

    return Inertia::render('Inbound/GoodsReceipt/Create', [
      'receipt' => $receipt,
      'can' => [
        'edit_GoodsReceipt' => true
      ]
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $this->authorize('update', GoodsReceipt::class);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $this->authorize('delete', GoodsReceipt::class);

    $ids = explode(',', $id);
    GoodsReceipt::whereIn('id', $ids)->delete();
    return Redirect::route('master.products.index');
  }
}
