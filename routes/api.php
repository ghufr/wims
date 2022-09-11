<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiCustomerController;
use App\Http\Controllers\Api\ApiProductController;
use App\Http\Controllers\Api\ApiVendorController;
use App\Http\Controllers\Api\ApiWarehouseController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('auth/login', [ApiAuthController::class, 'login'])->name('api.auth.login');

// Route::middleware('auth:sanctum')->name('api.')->group(function () {
//   Route::post('auth/refresh', [ApiAuthController::class, 'refresh'])->name('auth.refresh');
//   Route::post('auth/logout', [ApiAuthController::class, 'logout'])->name('auth.logout');

//   Route::name('master.')->prefix('master')->group(function () {
//     Route::apiResources(
//       [
//         'products' => ApiProductController::class,
//         'warehouses' => ApiWarehouseController::class,
//         'vendors' => ApiVendorController::class,
//         'customers' => ApiCustomerController::class,
//       ],
//       ['only' => ['index', 'show']]
//     );
//   });
// });
