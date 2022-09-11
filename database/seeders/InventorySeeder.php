<?php

namespace Database\Seeders;

use App\Models\GoodsReceipt;
use App\Models\Inventory;
use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $receipts = GoodsReceipt::where('status', '=', 'CLOSE')->with('products:id')->get();

    foreach ($receipts as $receipt) {
      $products = $receipt->products;
      $locations = Location::inRandomOrder()->where('warehouse_id', $receipt->warehouse_id)->limit(1)->get();

      foreach ($products as $product) {
        $location = $locations->first();
        $inventory = [
          'product_id' => $product->id,
          'warehouse_id' => $receipt->warehouse->id,
          'location_id' => $location->id,
          'client_id' => $receipt->client->id
        ];

        $existingInventory = Inventory::where($inventory)->get()->first();

        if (empty($existingInventory)) {
          Inventory::create([
            ...$inventory,
            'quantity' => $product->pivot->quantity,
            'avgPrice' => $product->pivot->price,
            'baseUom' => $product->pivot->baseUom,
          ]);
        } else {
          $nQuantity = $existingInventory->quantity + $product->pivot->quantity;
          $oldAmount = $existingInventory->quantity * $existingInventory->avgPrice;
          $nAmount = $product->pivot->amount;
          $nAvgPrice = ($nAmount + $oldAmount) / $nQuantity;

          $existingInventory->quantity = $nQuantity;
          $existingInventory->avgPrice = $nAvgPrice;
        }
      }
    }
  }
}
