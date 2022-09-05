<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutboundDelivery extends Model
{
  use HasFactory;

  protected $fillable = [
    'outboundNo',
    'deliveryDate',
    'status',
  ];

  public function client()
  {
    return $this->belongsTo(Customer::class);
  }

  public function origin()
  {
    return $this->belongsTo(Warehouse::class);
  }

  public function destination()
  {
    return $this->belongsTo(Customer::class, 'dest_id');
  }

  public function products()
  {
    return $this->belongsToMany(Product::class)->withPivot([
      'name',
      'description',
      'baseUom',
      'quantity',
      'price',
      'amount'
    ]);
  }
}
