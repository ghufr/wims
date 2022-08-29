<?php

namespace App\Services;


class ProductService
{
  public static function transform($nProducts, $products)
  {
    $nProducts->transform(function ($item, $key) use ($products) {
      $product = $products->where('id', $key)->firstOrFail()->only(['name', 'description', 'baseUom']);
      return [
        'quantity' => intval($item['quantity']),
        ...$product,
      ];
    });

    return $nProducts->toArray();
  }
}
