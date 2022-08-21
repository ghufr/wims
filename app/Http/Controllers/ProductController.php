<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
  public function index()
  {
    return Inertia::render('Master/Products/Index', [
      'products' => Product::all()
    ]);
  }

  public function create()
  {
    return Inertia::render('Master/Products/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|unique:products,name',
      'description' => 'nullable',
      'section' => 'required',
      'baseEan' => 'required|unique:products,baseEan',
      'baseUom' => 'required',
      'type' => 'required',
    ]);
    Product::create($validated);

    return Redirect::route('master.products.index');
  }

  public function show($id)
  {
    return Inertia::render('Master/Products/Create', [
      "product" => Product::where("id", $id)->first()
    ]);
  }

  public function update(Request $request, Product $product)
  {
    $validated = $request->validate([
      'name' => 'required|unique:products,name,' . $product->id,
      'description' => 'nullable',
      'section' => 'required',
      'baseEan' => 'required|unique:products,baseEan,' . $product->id,
      'baseUom' => 'required',
      'type' => 'required',
    ]);
    $product->update($validated);

    return Redirect::route('master.products.index');
  }

  public function destroy($id)
  {
    $ids = explode(',', $id);
    Product::whereIn('id', $ids)->delete();
    return Redirect::route('master.products.index');
  }
}
