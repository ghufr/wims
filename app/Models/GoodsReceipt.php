<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoodsReceipt extends Model
{
  use HasFactory;

  protected $fillable = [
    'grNo'
  ];

  public function client()
  {
    return $this->belongsTo(Customer::class);
  }

  public function supplier()
  {
    return $this->belongsTo(Vendor::class);
  }

  public function inbound()
  {
    return $this->belongsTo(Inbound::class);
  }
}
