<?php

use App\Models\Warehouse;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('inbound_deliveries', function (Blueprint $table) {
      $table->id();
      $table->string('inboundNo')->unique();
      $table->string('status')->default('OPEN');
      $table->date('deliveryDate');
      $table->foreignId('client_id')->constrained('customers')->restrictOnDelete();
      $table->foreignId('supplier_id')->constrained('vendors')->restrictOnDelete();
      $table->foreignIdFor(Warehouse::class)->constrained();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('inbound_delivery_product');
    Schema::dropIfExists('inbound_deliveries');
  }
};
