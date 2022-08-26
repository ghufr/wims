<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDelivery extends Model
{
  use HasFactory;

  public function origin()
  {
    $this->hasOne(Warehouse::class);
  }

  public function destination()
  {
    $this->hasOne(Customer::class);
  }
}
