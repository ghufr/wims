<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
  public static function attachProducts($nProducts, $entity)
  {
    $products = Product::whereIn('id', $nProducts->pluck('id'))->get();

    foreach ($nProducts as $product) {
      $matchProduct = $products->where('id', $product['id'])->first()->only(['name', 'description', 'baseUom']);
      $fillableProduct = [
        ...collect($product)->only(['price', 'quantity']),
        'amount' => intval($product['price']) * intval($product['quantity'])
      ];
      $entity->products()->attach($product['id'], [...$fillableProduct, ...$matchProduct]);
    }
  }
}
