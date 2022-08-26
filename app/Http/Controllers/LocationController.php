<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LocationController extends Controller
{
  public function index()
  {
    return Inertia::render('Master/Locations/Index', [
      'locations' => Location::all()
    ]);
  }

  public function create()
  {
    return Inertia::render('Master/Locations/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|unique:locations,name',
      'type' => 'required',
      'warehouseId' => 'required',
      'section' => 'required',
    ]);

    Location::create($validated);

    return Redirect::route('master.locations.index');
  }

  public function show($id)
  {
    return Inertia::render('Master/Vendors/Create', [
      "vendor" => Location::where("id", $id)->first()
    ]);
  }

  public function update(Request $request, $id)
  {
    //
  }

  public function destroy($id)
  {
    //
  }
}
