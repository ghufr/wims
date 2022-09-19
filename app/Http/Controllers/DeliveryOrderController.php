<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\DeliveryOrder;
use App\Models\Inventory;
use App\Models\Location;
use App\Models\OutboundDelivery;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
use App\Services\ProductService;
use App\Services\Utils;
use Exception;
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

    $nProducts = $request->collect('products');
    ProductService::attachProducts($nProducts, $order);

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

    $nProducts = $request->collect('products');
    $order->products()->detach();
    ProductService::attachProducts($nProducts, $order);

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

      foreach ($products as $product) {
        $deliveryOrder->products()->attach($product->product_id, $product->only(['name', 'description', 'baseUom', 'price', 'quantity', 'amount']));
      }

      $deliveryOrder->save();

      $outbound->status = 'CLOSE';
      $outbound->save();

      $index++;
    }

    return Redirect::route('outbound.order.index');
  }
  public function getPickingList(Request $request)
  {
    $validated = $request->validate([
      'deliveryOrderIds' => 'required|array'
    ]);


    $deliveryOrders = DeliveryOrder::with(['products', 'origin:id,name,description,address', 'destination:id,name,description,address', 'client:id,name'])->whereIn('id', $validated['deliveryOrderIds'])->get();
    $result = collect([]);
    foreach ($deliveryOrders as $deliveryOrder) {
      $products = $deliveryOrder->products;
      $productIds = $products->pluck('id');
      $inventories = Inventory::with(['location:id,name'])->whereIn('product_id', $productIds)
        ->where('client_id', $deliveryOrder->client_id)
        ->where('warehouse_id', $deliveryOrder->origin_id)
        // ->where('_id', $deliveryOrder->origin_id)
        ->get();
      $products = $products->map(function ($product) use ($inventories) {
        $locations = $inventories->where('product_id', $product->id)->all();
        return collect($product)->merge(['locations' => collect($locations)->values()]);
      });

      $result->push(collect($deliveryOrder)->merge(['products' => $products]));
    }

    // $deliveryOrdersByWarehouse = $deliveryOrders->groupBy(['origin_id', 'destination_id'])->map(function ($orderByWarehouse) {
    //   return [
    //     'origin' => $orderByWarehouse->get(0)->origin,
    //     'orders' => $orderByWarehouse
    //   ];
    // })->values();
    $productIds = $deliveryOrders->map->products;

    return response()->json(['deliveryOrders' => $result, 'deliveryOrdersByWarehouse' => $result->groupBy('origin_id'), 'locations' => []]);
  }
  public function toPicking(Request $request)
  {
    $this->authorize('create', DeliveryOrder::class);

    $validated = $request->validate([
      'inventories' => 'required|array',
      'deliveryOrderIds' => 'required|array',
    ]);

    $inventories = $request->collect('inventories');

    $deliveryOrders = DeliveryOrder::with(['products', 'origin:id,name,description', 'client:id,name', 'destination:id,name'])->whereIn('id', $validated['deliveryOrderIds'])->get();

    foreach ($deliveryOrders as $deliveryOrder) {
      $products = $deliveryOrder->products;
      // $productIds = $products->pluck('id');

      foreach ($products as $product) {
        $location = $inventories->where('deliveryOrder', $deliveryOrder->id)->first();
        // dd($deliveryOrder->id);
        // if (!$location) continue;
        $inventory = [
          'product_id' => $product->id,
          'warehouse_id' => $deliveryOrder->origin->id,
          'location_id' => $location['location'],
          'client_id' => $deliveryOrder->client->id
        ];

        $existingInventory = Inventory::where($inventory)->first();

        if (is_null($existingInventory)) {
          // Error
          throw new Exception('No product stored');
        } else {
          // dd($existingInventory);
          $nQuantity = $existingInventory->quantity - $product->pivot->quantity;

          if ($nQuantity < 0) {
            throw new Exception('Product quantity not enough');
          }
          // $oldAmount = $existingInventory->quantity * $existingInventory->avgPrice;
          // $nAmount = $product->pivot->amount;
          // $nAvgPrice = ($nAmount + $oldAmount) / $nQuantity;

          $existingInventory->update([
            'quantity' => $nQuantity,
            // 'avgPrice' => $nAvgPrice,
          ]);
        }
      }
      $deliveryOrder->update(['status' => 'CLOSE']);
    }
    return Redirect::route('outbound.order.index');
  }
}
