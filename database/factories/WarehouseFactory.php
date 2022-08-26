<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Warehouse>
 */
class WarehouseFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'name' => strtoupper(fake()->lexify('WR-????')),
      'description' => fake()->sentence(2),
      'address' => fake()->streetAddress(),
      'address2' => fake()->secondaryAddress(),
      'city' => fake()->city(),
      'postalCode' => fake()->postcode(),
      'phone' => fake()->phoneNumber(),
    ];
  }
}
