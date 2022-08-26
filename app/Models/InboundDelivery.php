<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InboundDelivery extends Model
{
  use HasFactory;

  protected $fillable = [
    'quantity',
  ];

  public function supplier()
  {
    return $this->hasOne(Vendor::class);
  }

  public function client()
  {
    return $this->hasOne(Customer::class);
  }

  public function products()
  {
    return $this->hasMany(Product::class);
  }

  public function receipts()
  {
    return $this->hasMany(GoodsReceipt::class);
  }
}
