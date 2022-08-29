<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutboundDelivery>
 */
class OutboundDeliveryFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    $origin = Warehouse::inRandomOrder()->limit(1)->get()->first();
    $clients = Customer::inRandomOrder()->limit(2)->get();

    return [
      'outboundNo' => fake()->ean13(),
      'status' => fake()->randomElement(['OPEN', 'CLOSE']),
      'deliveryDate' => fake()->dateTimeBetween('-1 week', '+1 week'),
      'origin_id' => $origin,
      'dest_id' => $clients->last(),
      'client_id' => $clients->first()
    ];
  }
}
