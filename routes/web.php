<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoodsReceiptController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\OrderDeliveryController;
use App\Http\Controllers\InboundDeliveryController;
use App\Http\Controllers\OutboundDeliveryController;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');


Route::prefix('inbound')->name('inbound.')->middleware(['auth'])->group(function () {
  Route::resources(
    [
      'delivery' => InboundDeliveryController::class,
      'receipt' => GoodsReceiptController::class
    ],
    ['except' => ['edit']]
  );
});

Route::prefix('outbound')->name('outbound.')->middleware(['auth'])->group(function () {
  Route::resources(
    [
      'delivery' => OutboundDeliveryController::class,
      'order' => OrderDeliveryController::class
    ],
    ['except' => ['edit']]
  );
});



Route::prefix('master')->name('master.')->middleware(['auth'])->group(function () {
  Route::resources(
    [
      'products' => ProductController::class,
      'warehouses' => WarehouseController::class,
      'vendors' => VendorController::class,
      'customers' => CustomerController::class,
      'locations' => LocationController::class,
      'users' => UserController::class
    ],
    ['except' => ['edit']]
  );
});


require __DIR__ . '/auth.php';
