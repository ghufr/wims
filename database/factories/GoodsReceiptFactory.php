<?php

namespace Database\Factories;

use App\Models\InboundDelivery;
use App\Models\Vendor;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GoodsReceipt>
 */
class GoodsReceiptFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {

    $inbound = InboundDelivery::inRandomOrder()->limit(1)->get()->first();
    $warehouse = Warehouse::inRandomOrder()->limit(1)->get()->first();

    $grDate = fake()->dateTimeBetween('-1 week', '-1 day');
    // $reference = rand(0, 1) === 1 ? 'PUTAWAY-' . date_format($grDate, 'Ymd') . fake()->numerify('##') : null;

    return [
      'grNo' => fake()->ean8(),
      'inboundNo' => $inbound->inboundNo,
      // 'reference' => $reference,
      'grDate' => $grDate,
      'client_id' => $inbound->client,
      'supplier_id' => $inbound->supplier,
      'warehouse_id' => $warehouse,
      'status' => fake()->randomElement(['OPEN', 'CLOSE', 'PROCESS'])
    ];
  }
}
