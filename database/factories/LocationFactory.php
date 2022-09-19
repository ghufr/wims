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
    $locationType = fake()->randomElement(['BULK', 'PICK']);
    return [
      'name' => strtoupper(fake()->bothify($locationType . '-?#')),
      'type' => $locationType,
      'section' => fake()->randomElement(['FAST', 'SLOW']),
    ];
  }
}
