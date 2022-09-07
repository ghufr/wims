<?php

namespace App\Services;


class ProductService
{
  public static function transform($nProducts, $products)
  {
    $nProducts->transform(function ($item, $key) use ($products) {
      $product = $products->where('id', $key)->firstOrFail()->only(['name', 'description', 'baseUom']);
      // $filtered = collect($item)->only(['inbound_delivery_id', 'outbound_delivery_id', 'goods_receipt_id', 'delivery_order_id']);
      return [
        'quantity' => intval($item['quantity']),
        'price' => intval($item['price']),
        'amount' => intval($item['price']) * intval($item['quantity']),
        ...$product,
        // ...$filtered,
      ];
    });

    return $nProducts->toArray();
  }
}
