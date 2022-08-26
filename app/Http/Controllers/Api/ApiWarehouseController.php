<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApiWarehouseController extends Controller
{
  public function index()
  {
    return Response::json(
      Warehouse::all()
    );
  }

  public function show($id)
  {

    return Response::json(
      Warehouse::where('id', $id)->first()
    );
  }
}
