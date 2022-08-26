<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use App\Models\Inventory;
use App\Models\Location;
use App\Models\Product;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $this->call(
      RolesAndPermissionsSeeder::class,
    );

    Product::factory(5)->create();
    Warehouse::factory(5)->create()->each(function ($warehouse) {
      Location::factory(3)->create([
        'warehouse_id' => $warehouse->id
      ]);
    });
    // Inventory::factory()
    //   ->hasProducts(1)
    //   ->hasWarehouses(1)
    //   ->hasLocations(1)
    //   ->count(10)
    //   ->create();
    Vendor::factory()->count(5)->create();
    Customer::factory()->count(5)->create();
  }
}
