<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Vendor;
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
    $clients = Vendor::where('type', 'C')->inRandomOrder()->limit(1)->get();
    $customer = Customer::inRandomOrder()->limit(1)->get();


    return [
      'outboundNo' => fake()->ean8(),
      'status' => fake()->randomElement(['OPEN', 'CLOSE', 'PROCESS']),
      'deliveryDate' => fake()->dateTimeBetween('-1 week', '- 1 day'),
      'origin_id' => $origin,
      'dest_id' => $customer->first(),
      'client_id' => $clients->first()
    ];
  }
}
