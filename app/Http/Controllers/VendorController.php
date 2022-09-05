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
    $this->authorize('viewAll', Vendor::class);

    return Inertia::render('Master/Vendors/Index', [
      'vendors' => Vendor::all()
    ]);
  }

  public function create()
  {
    $this->authorize('create', Vendor::class);

    return Inertia::render('Master/Vendors/Create');
  }

  public function store(Request $request)
  {
    $this->authorize('create', Vendor::class);

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

  public function show(Vendor $vendor)
  {
    $this->authorize('view', $vendor);

    return response()->json([
      'vendor' => $vendor
    ]);
  }

  public function update(Request $request, Vendor $vendor)
  {
    $this->authorize('update', $vendor);

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
    $this->authorize('delete', $id);

    $ids = explode(',', $id);
    Vendor::whereIn('id', $ids)->delete();
    return Redirect::route('master.vendors.index');
  }
}
