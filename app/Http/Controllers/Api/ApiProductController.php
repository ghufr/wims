<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApiProductController extends Controller
{
  public function index()
  {
    return Response::json(
      Product::all()
    );
  }

  public function show($id)
  {

    return Response::json(
      Product::where('id', $id)->first()
    );
  }
}
