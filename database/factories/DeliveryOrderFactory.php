<?php

namespace Database\Factories;

use App\Models\OutboundDelivery;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeliveryOrder>
 */
class DeliveryOrderFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {

    $outbound = OutboundDelivery::inRandomOrder()->limit(1)->get()->first();
    $warehouse = Warehouse::inRandomOrder()->limit(1)->get()->first();

    $deliveryDate = fake()->dateTimeBetween('-1 week', '-1 day');
    // $reference = rand(0, 1) === 1 ? 'PICK-' . date_format($deliveryDate, 'Ymd') . fake()->numerify('##') : null;

    return [
      'doNo' => fake()->ean8(),
      'outboundNo' => $outbound->outboundNo,
      // 'reference' => $reference,
      'status' => fake()->randomElement(['OPEN', 'CLOSE', 'PROCESS']),
      'deliveryDate' => $deliveryDate,
      'client_id' => $outbound->client_id,
      'origin_id' => $warehouse->id,
      'dest_id' => $outbound->dest_id,
    ];
  }
}
