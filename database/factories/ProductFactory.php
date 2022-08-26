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

    return [
      'name' => strtoupper(fake()->lexify('ITEM-????')),
      'description' => fake()->sentence(3),
      'section' => fake()->randomElement(['FAST', 'SLOW']),
      'baseEan' => fake()->ean13(),
      'baseUom' => fake()->randomElement(['Kg', 'L', 'pcs']),
      'type' => fake()->randomElement(['Beverage', 'Fishery', 'Meat', 'Vegetable']),
    ];
  }
}
