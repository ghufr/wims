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
    Schema::create('vendors', function (Blueprint $table) {
      $table->id();
      $table->string('name')->unique();
      $table->string('type')->default('C');
      $table->string('description')->nullable();
      $table->string('address');
      $table->string('address2')->nullable();
      $table->string('city')->nullable();
      $table->string('postalCode')->nullable();
      $table->string('phone')->nullable();
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
    Schema::dropIfExists('vendors');
  }
};
