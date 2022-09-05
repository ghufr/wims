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
    Schema::create('goods_receipts', function (Blueprint $table) {
      $table->id();
      $table->string('grNo')->unique();
      $table->string('inboundNo')->nullable();
      $table->string('reference')->nullable();
      $table->string('status')->default('OPEN');
      $table->date('grDate');
      $table->foreignId('warehouse_id')->constrained('warehouses')->restrictOnDelete();
      $table->foreignId('client_id')->nullable()->constrained('vendors')->restrictOnDelete();
      $table->foreignId('supplier_id')->constrained('vendors')->restrictOnDelete();
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
    Schema::dropIfExists('goods_receipt_product');
    Schema::dropIfExists('goods_receipts');
  }
};
