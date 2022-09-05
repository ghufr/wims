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
    Schema::create('outbound_delivery_product', function (Blueprint $table) {
      $table->foreignId('outbound_delivery_id')->constrained('outbound_deliveries')->onDelete('cascade');
      $table->foreignId('product_id')->constrained()->restrictOnDelete();
      $table->string('name');
      $table->string('description')->nullable();
      $table->string('baseUom')->default('Kg');
      $table->integer('quantity');
      $table->integer('price');
      $table->integer('amount');
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
  }
};
