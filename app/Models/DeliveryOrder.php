<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryOrder extends Model
{
  use HasFactory;

  protected $fillable = [
    'doNo',
    'outboundNo',
    'deliveryDate',
    'reference',
    'status'
  ];

  public function client()
  {
    return $this->belongsTo(Vendor::class, 'client_id', 'id');
  }

  public function origin()
  {
    return $this->belongsTo(Warehouse::class);
  }

  public function destination()
  {
    return $this->belongsTo(Customer::class, 'dest_id', 'id');
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
