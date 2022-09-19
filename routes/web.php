<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryOrderController;
use App\Http\Controllers\GoodsReceiptController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\InboundDeliveryController;
use App\Http\Controllers\InventoryController;
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

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'web'])->name('dashboard');


Route::prefix('inbound')->name('inbound.')->middleware(['auth', 'web'])->group(function () {
  Route::post('receipt/form-inbound', [GoodsReceiptController::class, 'fromInbound'])->name('receipt.from.inbound');
  Route::post('receipt/to-putaway', [GoodsReceiptController::class, 'toPutaway'])->name('receipt.to.putaway');
  Route::post('receipt/get-putaway', [GoodsReceiptController::class, 'getPutawayList'])->name('receipt.get.putaway');

  Route::resources(
    [
      'delivery' => InboundDeliveryController::class,
      'receipt' => GoodsReceiptController::class
    ],
    ['except' => ['edit']]
  );
});

Route::prefix('outbound')->name('outbound.')->middleware(['auth', 'web'])->group(function () {
  Route::post('order/form-outbound', [DeliveryOrderController::class, 'fromOutbound'])->name('order.from.outbound');
  Route::post('order/get-picking', [DeliveryOrderController::class, 'getPickingList'])->name('order.get.picking');
  Route::post('order/to-picking', [DeliveryOrderController::class, 'toPicking'])->name('order.to.picking');

  Route::resources(
    [
      'delivery' => OutboundDeliveryController::class,
      'order' => DeliveryOrderController::class
    ],
    ['except' => ['edit']]
  );
});

Route::prefix('inventory')->name('inventory.')->middleware(['auth', 'web'])->group(function () {
  Route::get('list', [InventoryController::class, 'index'])->name('list.index');
});

Route::prefix('master')->name('master.')->middleware(['auth', 'web'])->group(function () {
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
