<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'name' => strtoupper(fake()->bothify('?-##-?#')),
      'type' => fake()->randomElement(['BULK', 'PICK']),
      'section' => fake()->randomElement(['FAST', 'SLOW']),
    ];
  }
}
