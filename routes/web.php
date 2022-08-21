<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
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

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');


// Route::group('inbound', function() {
//   Route::get('delivery', )
// });

// Route::group('outbound', function() {

// });



Route::prefix('master')->name('master.')->middleware(['auth', 'verified'])->group(function () {
  Route::resources(
    [
      'products' => ProductController::class,
      'warehouses' => WarehouseController::class,
      'vendors' => VendorController::class,
      'customers' => CustomerController::class,
      'locations' => LocationController::class,
      'users' => UserController::class
    ],
    ['only' => ['index', 'show', 'create', 'store', 'update', 'destroy']]
  );
});


require __DIR__ . '/auth.php';
