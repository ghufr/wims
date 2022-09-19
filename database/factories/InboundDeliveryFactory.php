<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Vendor;
use App\Models\Warehouse;
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
    $client = Vendor::where('type', 'C')->inRandomOrder()->limit(1)->get()->first();
    $warehouse = Warehouse::inRandomOrder()->limit(1)->get()->first();

    return [
      'inboundNo' => fake()->ean8(),
      'status' => fake()->randomElement(['OPEN', 'CLOSE', 'PROCESS']),
      'deliveryDate' => fake()->dateTimeBetween('-1 week', '- 1 day'),
      'client_id' => $client,
      'supplier_id' => $supplier,
      'warehouse_id' => $warehouse
    ];
  }
}
