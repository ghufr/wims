<?php

namespace Database\Seeders;

use App\Models\DeliveryOrder;
use App\Models\OutboundDelivery;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OutboundSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $outbounds = OutboundDelivery::factory(10)->create();
    $deliveries = DeliveryOrder::factory(10)->create();


    foreach ($outbounds as $key => $outbound) {
      $products = Product::inRandomOrder()->limit(rand(2, 4))->get();
      $delivery = $deliveries->get($key);

      foreach ($products as $product) {
        $quantity = rand(100, 1000);
        $price = rand(21000, 75000);
        $amount = $price * $quantity;
        $nProduct = ['price' => $price, 'quantity' => $quantity, 'amount' => $amount, ...$product->only(['name', 'description', 'baseUom'])];

        $delivery->products()->attach($product->id, $nProduct);
        $outbound->products()->attach($product->id, $nProduct);
      }
      $delivery->save();
      $outbound->save();
    }
  }
}
