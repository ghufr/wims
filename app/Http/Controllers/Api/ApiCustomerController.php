<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApiCustomerController extends Controller
{
  public function index()
  {
    return Response::json(
      Customer::all()
    );
  }

  public function show($id)
  {

    return Response::json(
      Customer::where('id', $id)->first()
    );
  }
}
