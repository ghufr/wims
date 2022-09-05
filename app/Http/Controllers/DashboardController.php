<?php

namespace App\Http\Controllers;

use App\Models\DeliveryOrder;
use App\Models\GoodsReceipt;
use App\Models\InboundDelivery;
use App\Models\Inventory;
use App\Models\OutboundDelivery;
use App\Models\Product;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {

    // $inbound
    // TODO: diff date

    $now = Carbon::today()->toDateString();
    $before = Carbon::now()->sub(7, 'day')->toDateString();

    // $stockAging = Inventory::whereBetween('');

    $inbounds = InboundDelivery::with('products')->whereBetween('deliveryDate', [$before, $now])->get();
    $outbounds = OutboundDelivery::with('products')->whereBetween('deliveryDate', [$before, $now])->get();

    $goodsReceipts = GoodsReceipt::with('products')->whereBetween('grDate', [$before, $now])->get()->groupBy('grDate');
    $deliveryOrders = DeliveryOrder::with('products')->whereBetween('deliveryDate', [$before, $now])->get()->groupBy('deliveryDate');

    // $inventoryValue = Inventory::whereBetween('');

    $inboundQty = [
      'CLOSE' => 0,
      'OPEN' => 0,
      'PROCESS' => 0
    ];

    $outboundQty = [
      'CLOSE' => 0,
      'OPEN' => 0,
      'PROCESS' => 0
    ];

    foreach ($inbounds as $inbound) {
      foreach ($inbound->products as $product) {
        $inboundQty[$inbound->status] += $product->pivot->quantity;
      }
    }

    foreach ($outbounds as $outbound) {
      foreach ($outbound->products as $product) {
        $outboundQty[$outbound->status] += $product->pivot->quantity;
      }
    }

    // foreach()

    return Inertia::render('Dashboard', [
      // 'stockAging' => $stockAging,
      'goodsReceipts' => $goodsReceipts,
      'deliveryOrders' => $deliveryOrders,
      // 'inventoryValue' =>
      'inbounds' => $inbounds,
      'outbounds' => $outbounds,
      'inboundQty' => $inboundQty,
      'outboundQty' => $outboundQty,
    ]);
  }
}
