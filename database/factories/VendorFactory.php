<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vendor>
 */
class VendorFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    $vendorType = rand(0, 1) === 1 ? 'C' : 'S';
    return [
      'name' => strtoupper(fake()->lexify($vendorType . '-????')),
      'type' => $vendorType,
      'description' => fake()->name(),
      'address' => fake()->streetAddress(),
      'address2' => fake()->secondaryAddress(),
      'city' => fake()->city(),
      'postalCode' => fake()->postcode(),
      'phone' => fake()->phoneNumber(),
    ];
  }
}
