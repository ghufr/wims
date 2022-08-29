<?php

namespace App\Http\Controllers;

use App\Models\DeliveryOrder;
use App\Models\Product;
use App\Services\ProductService;
use App\Services\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DeliveryOrderController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $this->authorize('viewAll', DeliveryOrder::class);

    return Inertia::render('Outbound/DeliveryOrder/Index', [
      'orders' => DeliveryOrder::with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address'])->get()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $this->authorize('create', DeliveryOrder::class);

    return Inertia::render('Outbound/DeliveryOrder/Create', [
      'can' => [
        'edit_DeliveryOrder' => true,
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
    $this->authorize('create', DeliveryOrder::class);

    $validated = $request->validate([
      'deliveryDate' => 'required|date',
      'products' => 'required|array',
      'client' => 'required|exists:customers,id',
      'origin' => 'required|exists:warehouses,id',
      'destination' => 'required|exists:customers,id'
    ]);

    $outboundDelivery = new DeliveryOrder($validated);

    $count = DeliveryOrder::where('deliveryDate', '=', $validated['deliveryDate'])->count();
    $outboundDelivery->doNo = Utils::generateIncrementNo($validated['deliveryDate'], $count, 4);

    $outboundDelivery->client()->associate($validated['client']);
    $outboundDelivery->origin()->associate($validated['origin']);
    $outboundDelivery->destination()->associate($validated['destination']);
    $outboundDelivery->save();

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $outboundDelivery->products()->attach($nProducts);
    $outboundDelivery->save();

    return Redirect::route('outbound.delivery.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $this->authorize('view', DeliveryOrder::class);

    $order = DeliveryOrder::where('id', $id)->with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address', 'products:id,name,description'])->firstOrFail();
    $products = $order->products->map->pivot;

    $order = $order->toArray();
    $order['products'] = $products->toArray();
    return Inertia::render('Outbound/DeliveryOrder/Create', [
      "order" => $order,
      "can" => [
        'edit_DeliveryOrder' => $order['reference'] != null
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
    $this->authorize('update', DeliveryOrder::class);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $this->authorize('delete', DeliveryOrder::class);

    $ids = explode(',', $id);
    DeliveryOrder::whereIn('id', $ids)->delete();
    return Redirect::route('outbound.delivery.index');
  }
}
