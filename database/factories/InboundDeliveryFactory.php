<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class InboundDeliveryFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    $supplier = Vendor::inRandomOrder()->limit(1)->get()->first();
    $client = Customer::inRandomOrder()->limit(1)->get()->first();
    return [
      'inboundNo' => fake()->ean13(),
      'status' => fake()->randomElement(['OPEN', 'CLOSE']),
      'deliveryDate' => fake()->dateTimeBetween('-1 week', '+1 week'),
      'client_id' => $client,
      'supplier_id' => $supplier,
    ];
  }
}
