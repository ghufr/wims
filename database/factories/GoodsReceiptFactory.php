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
    $grDate = fake()->dateTimeBetween('-1 week', '-1 day');

    $inbound = InboundDelivery::inRandomOrder()->first();

    $warehouse = Warehouse::inRandomOrder()->first();

    return [
      'grNo' => fake()->ean13(),
      'inboundNo' => $inbound->inboundNo,
      'reference' => 'PUTAWAY-' . date_format($grDate, 'Ymd') . fake()->numerify('##'),
      'grDate' => $grDate,
      'client_id' => $inbound->client,
      'supplier_id' => $inbound->supplier,
      'warehouse_id' => $warehouse
    ];
  }
}
