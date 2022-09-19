<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\DeliveryOrder;
use App\Models\OutboundDelivery;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Services\ProductService;
use App\Services\Utils;

class OutboundDeliveryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $this->authorize('viewAll', OutboundDelivery::class);

    return Inertia::render('Outbound/OutboundDelivery/Index', [
      'outbounds' => OutboundDelivery::with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address'])->orderBy('updated_at', 'desc')->get(),
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
    $this->authorize('create', OutboundDelivery::class);

    return Inertia::render('Outbound/OutboundDelivery/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $this->authorize('create', OutboundDelivery::class);

    $validated = $request->validate([
      'deliveryDate' => 'required|date',
      'products' => 'required|array',
      'client' => 'required|exists:customers,id',
      'origin' => 'required|exists:warehouses,id',
      'destination' => 'required|exists:customers,id'
    ]);

    $outboundDelivery = new OutboundDelivery($validated);

    $count = OutboundDelivery::where('deliveryDate', '=', $validated['deliveryDate'])->count();
    $outboundDelivery->outboundNo = Utils::generateIncrementNo($validated['deliveryDate'], $count, 3);

    $outboundDelivery->client()->associate($validated['client']);
    $outboundDelivery->origin()->associate($validated['origin']);
    $outboundDelivery->destination()->associate($validated['destination']);
    $outboundDelivery->save();

    $nProducts = $request->collect('products');
    ProductService::attachProducts($nProducts, $outboundDelivery);

    // $outboundDelivery->products()->attach($nProducts);
    $outboundDelivery->save();

    return Redirect::route('outbound.delivery.index');
  }

  public function show(OutboundDelivery $delivery)
  {
    $this->authorize('view', $delivery);

    $delivery = $delivery->load(['client:id,name,description', 'origin:id,name,description,address', 'destination:id,name,description,address', 'products:id']);
    $products = $delivery->products->map->pivot;

    $delivery = $delivery->toArray();
    $delivery['products'] = $products->toArray();

    return response()->json([
      'outbound' => $delivery
    ]);
  }

  public function update(Request $request, OutboundDelivery $delivery)
  {
    $this->authorize('update', $delivery);

    $validated = $request->validate([
      'deliveryDate' => 'required|date',
      'products' => 'required|array',
      'client' => 'required|exists:customers,id',
      'origin' => 'required|exists:warehouses,id',
      'destination' => 'required|exists:customers,id',
      'products' => 'required|array'
    ]);


    $delivery->client()->associate($validated['client']);
    $delivery->origin()->associate($validated['origin']);
    $delivery->destination()->associate($validated['destination']);
    // $delivery->update();

    $nProducts = $request->collect('products');
    $delivery->products()->detach();
    ProductService::attachProducts($nProducts, $delivery);

    // $delivery->products()->sync($nProducts);
    $delivery->save();

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
    OutboundDelivery::whereIn('id', $ids)->delete();
    return Redirect::route('outbound.delivery.index');
  }
}
