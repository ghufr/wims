<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class WarehouseController extends Controller
{
  public function index()
  {
    return Inertia::render('Master/Warehouses/Index', [
      'warehouses' => Warehouse::all()
    ]);
  }

  public function create()
  {
    return Inertia::render('Master/Warehouses/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|unique:warehouses,name',
      'description' => 'nullable',
      'address' => 'required',
      'address2' => 'nullable',
      'city' => 'required',
      'postalCode' => 'string|required',
      'phone' => 'string|nullable',
    ]);
    Warehouse::create($validated);

    return Redirect::route('master.warehouses.index');
  }

  public function show($id)
  {
    return Inertia::render('Master/Warehouses/Create', [
      "warehouse" => Warehouse::where("id", $id)->first()
    ]);
  }

  public function update(Request $request, Warehouse $warehouse)
  {
    $validated = $request->validate([
      'name' => 'required|unique:warehouses,name,' . $warehouse->id,
      'description' => 'nullable',
      'address' => 'required',
      'address2' => 'nullable',
      'city' => 'required',
      'postalCode' => 'string|required',
      'phone' => 'string|nullable',
    ]);
    $warehouse->update($validated);

    return Redirect::route('master.warehouses.index');
  }

  public function destroy($id)
  {
    $ids = explode(',', $id);
    Warehouse::whereIn('id', $ids)->delete();
    return Redirect::route('master.warehouses.index');
  }
}
