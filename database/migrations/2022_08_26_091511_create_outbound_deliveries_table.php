<?php

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
    Schema::create('outbound_deliveries', function (Blueprint $table) {
      $table->id();
      $table->string('outboundNo')->unique();
      $table->string('status')->default('OPEN');
      $table->date('deliveryDate');
      $table->foreignId('client_id')->constrained('customers')->restrictOnDelete();
      $table->foreignId('origin_id')->constrained('warehouses')->restrictOnDelete();
      $table->foreignId('dest_id')->constrained('customers')->restrictOnDelete();
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
    Schema::dropIfExists('outbound_delivery_product');
    Schema::dropIfExists('outbound_deliveries');
  }
};
