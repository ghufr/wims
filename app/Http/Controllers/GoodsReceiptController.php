<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\Vendor;
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
    $validated = $request->validate([
      'client' => 'sometimes|exists:vendors,name',
      'supplier' => 'required|exists:vendors,name',
      'grDate' => 'required',
    ]);

    $goodsReceipt = new GoodsReceipt($validated);

    $client = Vendor::where('name', $validated['client'])->first();
    $supplier = Vendor::where('name', $validated['supplier'])->first();

    $date = date_create($validated['grDate']);
    $count = GoodsReceipt::where('grDate', '=', $validated['grDate'])->count();
    $goodsReceipt->inboundNo = date_format($date, "Ymd") . $count + 2000;

    if ($client) {
      $goodsReceipt->client()->associate($client);
    }
    $goodsReceipt->supplier()->associate($supplier);

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
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    // $this->authorize('delete', Product::class);

    $ids = explode(',', $id);
    GoodsReceipt::whereIn('id', $ids)->delete();
    return Redirect::route('master.products.index');
  }
}
