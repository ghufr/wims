<?php

namespace App\Http\Controllers;

use App\Models\OutboundDelivery;
use App\Models\Product;
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
      'outbounds' => OutboundDelivery::with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address'])->get()
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
      'outboundNo' => 'sometimes|exists:outbound_deliveries,outboundNo',
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

    $nProducts = $request->collect('products')->keyBy('id');
    $products = Product::whereIn('id', $nProducts->keys())->get();
    $nProducts = ProductService::transform($nProducts, $products);

    $outboundDelivery->products()->attach($nProducts);
    $outboundDelivery->save();

    return Redirect::route('outbound.delivery.index');
  }

  public function show(OutboundDelivery $outbound)
  {
    $this->authorize('view', $outbound);

    $outbound = $outbound->with(['client:id,name', 'origin:id,name,address', 'destination:id,name,address', 'products:id,name,description'])->firstOrFail();
    $products = $outbound->products->map->pivot;

    $outbound = $outbound->toArray();
    $outbound['products'] = $products->toArray();
    return Inertia::render('Outbound/OutboundDelivery/Create', [
      "outbound" => $outbound,

    ]);
  }


  public function update(Request $request, OutboundDelivery $outbound)
  {
    $this->authorize('update', $outbound);

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
    $this->authorize('delete', $id);

    $ids = explode(',', $id);
    OutboundDelivery::whereIn('id', $ids)->delete();
    return Redirect::route('outbound.delivery.index');
  }
}
