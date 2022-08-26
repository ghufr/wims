<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApiVendorController extends Controller
{
  public function index()
  {
    return Response::json(
      Vendor::all()
    );
  }

  public function show($id)
  {

    return Response::json(
      Vendor::where('id', $id)->first()
    );
  }
}
