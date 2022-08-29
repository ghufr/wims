<?php

namespace App\Http\Controllers;

use App\Models\InboundDelivery;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
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
    return Inertia::render('Inbound/InboundDelivery/Index', [
      'inbounds' => InboundDelivery::with(['client:id,name', 'supplier:id,name'])->get()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('Inbound/InboundDelivery/Create', [
      "can" => [
        'edit_InboundDelivery' => true
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
      'deliveryDate' => 'required',
    ]);


    $inboundDelivery = new InboundDelivery($validated);

    $client = Vendor::where('name', $validated['client'])->first();
    $supplier = Vendor::where('name', $validated['supplier'])->first();

    $date = date_create($validated['deliveryDate']);
    $count = InboundDelivery::where('deliveryDate', '=', $validated['deliveryDate'])->count();
    $inboundDelivery->inboundNo = date_format($date, "Ymd") . $count + 1000;

    if ($client) {
      $inboundDelivery->client()->associate($client);
    }
    $inboundDelivery->supplier()->associate($supplier);
    $inboundDelivery->save();

    $reqProducts = $request->input('products');
    $productIds = Arr::pluck($reqProducts, 'id');
    $products = Product::whereIn('id', $productIds)->get();
    $productsQuantity = $this->transformProduct($reqProducts, $products);

    $inboundDelivery->products()->attach($productsQuantity);
    $inboundDelivery->save();

    return Redirect::route('inbound.delivery.index');
  }

  public function show($id)
  {
    $inbound = InboundDelivery::where("id", $id)->with(['client:id,name', 'supplier:id,name', 'products:id'])->firstOrFail();
    $products = $inbound->products->map->pivot;

    $inbound = $inbound->toArray();
    $inbound['products'] = $products->toArray();

    return Inertia::render('Inbound/InboundDelivery/Create', [
      "inbound" =>  $inbound,
      "can" => [
        'edit_InboundDelivery' => $inbound['status'] === 'OPEN'
      ]
    ]);
  }

  public function update(Request $request, InboundDelivery $inboundDelivery)
  {
    $validated = $request->validate([
      'client' => 'sometimes|exists:vendors,name',
      'supplier' => 'required|exists:vendors,name',
      'deliveryDate' => 'required',
    ]);

    $client = Vendor::where('name', $validated['client'])->first();
    $supplier = Vendor::where('name', $validated['supplier'])->first();

    if ($client) {
      $inboundDelivery->client()->associate($client);
    }
    $inboundDelivery->supplier()->associate($supplier);

    $inboundDelivery->update($validated);

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
    $ids = explode(',', $id);
    InboundDelivery::whereIn('id', $ids)->delete();
    return Redirect::route('inbound.delivery.index');
  }


  protected function transformProduct($reqProducts, $products)
  {
    $productsQuantity = [];
    $quantityById = Arr::pluck($reqProducts, 'quantity', 'id');

    foreach ($products as $product) {
      $productsQuantity[$product->id] = [
        'name' => $product->name,
        'baseUom' => $product->baseUom,
        'description' => $product->description,
        'quantity' => $quantityById[$product->id]
      ];
    }
  }
}
