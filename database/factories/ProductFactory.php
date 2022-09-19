<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {

    $category = fake()->randomElement(['Pelagis', 'Cumi', 'Gurita', 'Kerang']);
    $size = fake()->randomElement(['root', '6-8', '200', '800']);

    return [
      'name' => strtoupper(fake()->numerify($category . '-' . $size . '-##')),
      'description' => fake()->sentence(1),
      'section' => fake()->randomElement(['FAST', 'SLOW']),
      'baseEan' => fake()->ean8(),
      'baseUom' => fake()->randomElement(['Kg']),
      'category' => $category,
      'type' => fake()->randomElement(['Frozen', 'Fresh']),
      'lifespan' => fake()->numberBetween(31, 100)
    ];
  }
}
