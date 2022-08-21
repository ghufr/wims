<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
  use HasFactory;

  protected $fillable = [
    'quantity',
  ];

  public function product()
  {
    $this->hasOne(Product::class);
  }

  public function location()
  {
    $this->hasOne(Location::class);
  }

  public function warehouse()
  {
    $this->hasOne(Warehouse::class);
  }
}
