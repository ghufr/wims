<?php

use App\Models\Location;
use App\Models\Product;
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
    Schema::create('inventories', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(Product::class)->constrained();
      $table->foreignIdFor(Warehouse::class)->constrained();
      $table->foreignIdFor(Location::class)->constrained();
      $table->foreignId('client_id')->nullable()->constrained('vendors')->restrictOnDelete();

      $table->integer('quantity')->min(0);
      $table->float('avgPrice');
      $table->string('baseUom')->default('Kg');
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
    Schema::dropIfExists('inventories');
  }
};
