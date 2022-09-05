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
    Schema::create('delivery_orders', function (Blueprint $table) {
      $table->id();
      $table->string('doNo')->unique();
      $table->string('outboundNo')->nullable();
      $table->string('reference')->nullable();
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
    Schema::dropIfExists('delivery_orders');
  }
};
