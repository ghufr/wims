<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\DeliveryOrder;
use App\Models\OutboundDelivery;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
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
      'orders' => DeliveryOrder::with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address'])->orderBy('updated_at', 'desc')->get(),
      'warehouses' => Warehouse::all(['id', 'name', 'description', 'address']),
      'clients' => Vendor::where('type', 'C')->get(),
      'customers' => Customer::all(['id', 'name', 'description', 'address']),
      'products' => Product::all(['id', 'name', 'description', 'baseUom'])
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

    return Redirect::route('outbound.order.index');
  }

  public function show(DeliveryOrder $order)
  {
    $this->authorize('view', $order);

    $order = $order->load(['client:id,name,description', 'origin:id,name,description,address', 'destination:id,name,description,address', 'products:id,name,description,baseUom']);
    $products = $order->products->map->pivot;

    $order = $order->toArray();
    $order['products'] = $products->toArray();

    return response()->json([
      'order' => $order
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

    $order->client()->associate($validated['client']);
    $order->origin()->associate($validated['origin']);
    $order->destination()->associate($validated['destination']);

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $order->products()->sync($nProducts);
    $order->save();

    return Redirect::route('outbound.order.index');
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
    return Redirect::route('outbound.order.index');
  }

  public function fromOutbound(Request $request)
  {
    $this->authorize('create', DeliveryOrder::class);
    $validated = $request->validate([
      'deliveryDate' => 'required|date',
      'outboundIds' => 'required|array',
    ]);

    $outbounds = OutboundDelivery::with(['products:id'])->whereIn('id', $validated['outboundIds'])->get();
    $count = DeliveryOrder::where('deliveryDate', '=', $validated['deliveryDate'])->count();


    $index = 0;
    foreach ($outbounds as $outbound) {
      $deliveryOrder = new DeliveryOrder([
        'outboundNo' => $outbound->outboundNo,
        'deliveryDate' => $validated['deliveryDate'],
      ]);

      $deliveryOrder->doNo = Utils::generateIncrementNo($validated['deliveryDate'], $count + $index, 1);
      $deliveryOrder->client()->associate($outbound->client);
      $deliveryOrder->origin()->associate($outbound->origin);
      $deliveryOrder->destination()->associate($outbound->destination);

      $deliveryOrder->save();

      $products = $outbound->products->map->pivot;
      $nProducts = $products->keyBy('product_id');
      $nProducts->transform(function ($item, $key) {
        return $item->only(['name', 'description', 'baseUom', 'price', 'quantity', 'amount']);
      });

      $deliveryOrder->products()->attach($nProducts->toArray());
      $deliveryOrder->save();


      $outbound->status = 'CLOSE';
      $outbound->save();

      $index++;
    }

    return Redirect::route('outbound.order.index');
  }
  public function getPickingList()
  {
    // TODO
  }
  public function toPicking()
  {
    $this->authorize('create', DeliveryOrder::class);
    //
  }
}
