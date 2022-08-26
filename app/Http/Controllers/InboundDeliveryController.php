<?php

namespace App\Http\Controllers;

use App\Models\InboundDelivery;
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
    return Inertia::render('Inbound/InboundDelivery/Index');
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
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
    $request->validate([
      'inboundNo' => 'required',
      'client' => 'string',
      'supplier' => 'required',
      'deliveryDate' => 'required',
      'products' => 'required'
    ]);

    Redirect::route('inbound.delivery.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    return Inertia::render('Inbound/InboundDelivery/Create', [
      "inbound" => InboundDelivery::where("id", $id)->first()
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
    $ids = explode(',', $id);
    InboundDelivery::whereIn('id', $ids)->delete();
    return Redirect::route('outbound.delivery.index');
  }
}
