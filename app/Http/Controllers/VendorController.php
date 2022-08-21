<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class VendorController extends Controller
{
  public function index()
  {
    return Inertia::render('Master/Vendors/Index', [
      'vendors' => Vendor::all()
    ]);
  }

  public function create()
  {
    return Inertia::render('Master/Vendors/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|unique:vendors,name',
      'description' => 'nullable',
      'address' => 'required',
      'address2' => 'nullable',
      'city' => 'required',
      'postalCode' => 'string|required',
      'phone' => 'string|nullable',
    ]);
    Vendor::create($validated);

    return Redirect::route('master.vendors.index');
  }

  public function show($id)
  {
    return Inertia::render('Master/Vendors/Create', [
      "vendor" => Vendor::where("id", $id)->first()
    ]);
  }

  public function update(Request $request, Vendor $vendor)
  {
    $validated = $request->validate([
      'name' => 'required|unique:vendors,name,' . $vendor->id,
      'description' => 'nullable',
      'address' => 'required',
      'address2' => 'nullable',
      'city' => 'required',
      'postalCode' => 'string|required',
      'phone' => 'string|nullable',
    ]);

    $vendor->update($validated);

    return Redirect::route('master.vendors.index');
  }

  public function destroy($id)
  {
    $ids = explode(',', $id);
    Vendor::whereIn('id', $ids)->delete();
    return Redirect::route('master.vendors.index');
  }
}
