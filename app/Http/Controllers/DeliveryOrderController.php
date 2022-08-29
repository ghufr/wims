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

    return Inertia::render('Outbound/DeliveryOrder/Create');
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

    $order = new DeliveryOrder($validated);

    $count = DeliveryOrder::where('deliveryDate', '=', $validated['deliveryDate'])->count();
    $order->doNo = Utils::generateIncrementNo($validated['deliveryDate'], $count, 4);

    $order->client()->associate($validated['client']);
    $order->origin()->associate($validated['origin']);
    $order->destination()->associate($validated['destination']);
    $order->save();

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $order->products()->attach($nProducts);
    $order->save();

    return Redirect::route('outbound.delivery.index');
  }

  public function show(DeliveryOrder $order)
  {
    $this->authorize('view', $order);

    $order = $order->with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address', 'products:id,name,description'])->firstOrFail();
    $products = $order->products->map->pivot;

    $order = $order->toArray();
    $order['products'] = $products->toArray();
    return Inertia::render('Outbound/DeliveryOrder/Create', [
      "order" => $order
    ]);
  }

  public function update(Request $request, DeliveryOrder $order)
  {
    $this->authorize('update', $order);

    $validated = $request->validate([
      'deliveryDate' => 'required|date',
      'products' => 'required|array',
      'client' => 'required|exists:customers,id',
      'origin' => 'required|exists:warehouses,id',
      'destination' => 'required|exists:customers,id'
    ]);


    $count = DeliveryOrder::where('deliveryDate', '=', $validated['deliveryDate'])->count();
    $order->doNo = Utils::generateIncrementNo($validated['deliveryDate'], $count, 4);

    $order->client()->associate($validated['client']);
    $order->origin()->associate($validated['origin']);
    $order->destination()->associate($validated['destination']);
    $order->save();

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $order->products()->attach($nProducts);
    $order->save();

    return Redirect::route('outbound.delivery.index');
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
    DeliveryOrder::whereIn('id', $ids)->delete();
    return Redirect::route('outbound.delivery.index');
  }
}
