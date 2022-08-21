<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CustomerController extends Controller
{
  public function index()
  {
    return Inertia::render('Master/Customers/Index', [
      'customers' => Customer::all()
    ]);
  }

  public function create()
  {
    return Inertia::render('Master/Customers/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|unique:customers,name',
      'description' => 'nullable',
      'address' => 'required',
      'address2' => 'nullable',
      'city' => 'required',
      'postalCode' => 'string|required',
      'phone' => 'string|nullable',
    ]);
    Customer::create($validated);

    return Redirect::route('master.customers.index');
  }

  public function show($id)
  {
    return Inertia::render('Master/Customers/Create', [
      "customer" => Customer::where("id", $id)->first()
    ]);
  }

  public function update(Request $request, Customer $customer)
  {
    $validated = $request->validate([
      'name' => 'required|unique:customers,name,' . $customer->id,
      'description' => 'nullable',
      'address' => 'required',
      'address2' => 'nullable',
      'city' => 'required',
      'postalCode' => 'string|required',
      'phone' => 'string|nullable',
    ]);

    $customer->update($validated);

    return Redirect::route('master.customers.index');
  }

  public function destroy($id)
  {
    $ids = explode(',', $id);
    Customer::whereIn('id', $ids)->delete();
    return Redirect::route('master.customers.index');
  }
}
