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

  public function show(GoodsReceipt $receipt)
  {
    $this->authorize('view', $receipt);

    $receipt = $receipt->with(['client:id,name', 'supplier:id,name', 'warehouse:id,name'])->firstOrFail();
    $products = $receipt->products->map->pivot;

    $receipt = $receipt->toArray();
    $receipt['products'] = $products->toArray();

    return Inertia::render('Inbound/GoodsReceipt/Create', [
      'receipt' => $receipt,
    ]);
  }


  public function update(Request $request, GoodsReceipt $receipt)
  {
    $this->authorize('update', $receipt);
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
    return Redirect::route('master.products.index');
  }
}
