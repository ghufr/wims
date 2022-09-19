<?php

namespace App\Http\Controllers;

use App\Models\InboundDelivery;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
use App\Services\ProductService;
use App\Services\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InboundDeliveryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $this->authorize('viewAll', InboundDelivery::class);

    return Inertia::render('Inbound/InboundDelivery/Index', [
      'inbounds' => InboundDelivery::with(['client:id,name', 'supplier:id,name', 'warehouse:id,name'])->orderBy('updated_at', 'desc')->get(),
      'warehouses' => Warehouse::all(['id', 'name', 'description']),
      'clients' => Vendor::where('type', 'C')->get(),
      'suppliers' => Vendor::where('type', 'S')->get(),
      'products' => Product::all(['id', 'name', 'description', 'baseUom']),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $this->authorize('viewAll', InboundDelivery::class);

    return Inertia::render('Inbound/InboundDelivery/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $this->authorize('create', InboundDelivery::class);

    $validated = $request->validate([
      'client' => 'required|exists:vendors,id',
      'supplier' => 'required|exists:vendors,id',
      'warehouse' => 'required|exists:warehouses,id',
      'deliveryDate' => 'required|date',
      'products' => 'required|array',
    ]);


    $inboundDelivery = new InboundDelivery($validated);

    // $client = Vendor::where('name', $validated['client'])->firstOrFail();
    // $supplier = Vendor::where('name', $validated['supplier'])->firstOrFail();

    $count = InboundDelivery::where('deliveryDate', $validated['deliveryDate'])->count();
    $inboundDelivery->inboundNo = Utils::generateIncrementNo($validated['deliveryDate'], $count, 1);

    $inboundDelivery->client()->associate($validated['client']);
    $inboundDelivery->supplier()->associate($validated['supplier']);
    $inboundDelivery->warehouse()->associate($validated['warehouse']);

    $inboundDelivery->save();

    $nProducts = $request->collect('products');
    ProductService::attachProducts($nProducts, $inboundDelivery);
    $inboundDelivery->save();

    return Redirect::route('inbound.delivery.index');
  }

  public function show(InboundDelivery $delivery)
  {
    $this->authorize('view', $delivery);

    $delivery = $delivery->load(['client:id,name,description', 'supplier:id,name,description', 'products:id', 'warehouse:id,name,description']);
    $products = $delivery->products->map->pivot;

    $delivery = $delivery->toArray();
    $delivery['products'] = $products->toArray();

    return response()->json([
      'inbound' => $delivery
    ]);
  }

  public function update(Request $request, InboundDelivery $delivery)
  {
    $this->authorize('update', $delivery);

    $validated = $request->validate([
      'client' => 'required|exists:vendors,id',
      'warehouse' => 'required|exists:warehouses,id',
      'supplier' => 'required|exists:vendors,id',
      'deliveryDate' => 'required|date',
      'products' => 'required|array',
    ]);


    $delivery->client()->associate($validated['client']);
    $delivery->supplier()->associate($validated['supplier']);
    $delivery->warehouse()->associate($validated['warehouse']);

    $nProducts = $request->collect('products');
    $delivery->products()->detach();
    ProductService::attachProducts($nProducts, $delivery);

    $delivery->save();

    return Redirect::route('inbound.delivery.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $this->authorize('update', $id);

    $ids = explode(',', $id);
    InboundDelivery::whereIn('id', $ids)->delete();
    return Redirect::route('inbound.delivery.index');
  }
}
