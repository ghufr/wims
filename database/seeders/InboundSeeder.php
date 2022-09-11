<?php

namespace Database\Seeders;

use App\Models\GoodsReceipt;
use App\Models\InboundDelivery;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InboundSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $inbounds = InboundDelivery::factory(100)->create();
    $receipts = GoodsReceipt::factory(100)->create();

    foreach ($inbounds as $key => $inbound) {
      $products = Product::inRandomOrder()->limit(rand(2, 4))->get();
      $receipt = $receipts->get($key);

      foreach ($products as $product) {
        $quantity = rand(1, 9) * 20;
        $price = rand(20, 50) * 1000;
        $amount = $price * $quantity;
        $nProduct = ['price' => $price, 'quantity' => $quantity, 'amount' => $amount, ...$product->only(['name', 'description', 'baseUom'])];

        $receipt->products()->attach($product->id, $nProduct);

        $inbound->products()->attach($product->id, $nProduct);
      }
      $inbound->save();
      $receipt->save();
    }
  }
}
