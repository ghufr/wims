<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use App\Models\Location;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

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

    Product::factory(100)->create();
    Warehouse::factory(10)->create()->each(function ($warehouse) {
      Location::factory(15)->create([
        'warehouse_id' => $warehouse->id
      ]);
    });
    Vendor::factory()->count(100)->create();
    Customer::factory()->count(100)->create();

    $this->call(
      [
        InboundSeeder::class,
        InventorySeeder::class,
        OutboundSeeder::class
      ]
    );
  }
}
