<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends Controller
{
  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|string|email',
      'password' => 'required|string',
    ]);
    $credentials = $request->only('email', 'password');

    $token = Auth::guard('api')->attempt($credentials);

    if (!$token) {
      return response()->json([
        'status' => 'error',
        'message' => 'Unauthorized',
      ], 401);
    }

    $user = Auth::user();
    return response()->json([
      'status' => 'success',
      'user' => $user,
      'authorisation' => [
        'token' => $token,
        'type' => 'bearer',
      ]
    ]);
  }

  public function logout()
  {
    Auth::logout();
    return response()->json([
      'status' => 'success',
      'message' => 'Successfully logged out',
    ]);
  }

  public function refresh()
  {
    return response()->json([
      'status' => 'success',
      'user' => Auth::user(),
      'authorisation' => [
        'token' => Auth::refresh(),
        'type' => 'bearer',
      ]
    ]);
  }
}
