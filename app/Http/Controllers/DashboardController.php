<?php

namespace App\Http\Controllers;

use App\Models\DeliveryOrder;
use App\Models\GoodsReceipt;
use App\Models\InboundDelivery;
use App\Models\Inventory;
use App\Models\OutboundDelivery;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function index()
  {

    // $inbound
    // TODO: diff date

    $now = Carbon::now()->add(2, 'day')->toDateString();
    $before = Carbon::now()->sub(7, 'day')->toDateString();

    // $stockAging = Inventory::whereBetween('');

    $inbounds = InboundDelivery::with('products')->whereBetween('deliveryDate', [$before, $now])->get();
    $outbounds = OutboundDelivery::with('products')->whereBetween('deliveryDate', [$before, $now])->get();

    // $inboundsBeforeToday = GoodsReceipt::select(['id', 'grNo', 'updated_at'])->with('products')->where([['updated_at', '<', $now], ['status', '=', 'CLOSE']])->group(->get();
    // $outboundsBeforeToday = OutboundDelivery::where([['updated_at', '<', $now], ['status', '=', 'CLOSE']]);
    $grValueBeforeToday = GoodsReceipt::select([
      DB::raw("DATE_FORMAT(grDate, '%Y-%m-%d') as posting_date"),
      DB::raw("SUM(goods_receipt_product.quantity) as quantity")
    ])
      ->join('goods_receipt_product', 'goods_receipts.id', '=', 'goods_receipt_product.goods_receipt_id')
      // ->whereRaw("DATE_FORMAT(updated_at, '%Y-%m-%d') < ?", [$now])
      ->where([['status', '=', 'CLOSE']])
      ->groupBy('posting_date')
      ->orderBy('posting_date')
      ->get();

    $doValueBeforeToday = DeliveryOrder::select([
      DB::raw("DATE_FORMAT(deliveryDate, '%Y-%m-%d') as posting_date"),
      DB::raw("SUM(delivery_order_product.quantity) as quantity")
    ])
      ->join('delivery_order_product', 'delivery_orders.id', '=', 'delivery_order_product.delivery_order_id')
      ->where([['status', '=', 'CLOSE']])
      ->groupBy('posting_date')
      ->orderBy('posting_date')
      ->get();


    $inventoryValues = [];
    $receiveValue = [];
    $deliveryValue = [];
    $inOutQty = [];


    $grValueBeforeToday->reduce(function ($carry, $item) use (&$receiveValue) {
      $quantity = doubleval($item['quantity']);
      $receiveValue[] = ['quantity' => $carry + $quantity, 'posting_date' => $item['posting_date']];
      return $carry += $quantity;
    }, 0);

    $doValueBeforeToday->reduce(function ($carry, $item) use (&$deliveryValue) {
      $quantity = doubleval($item['quantity']);
      $receiveValue[] = ['quantity' => $carry + $quantity, 'posting_date' => $item['posting_date']];
      return $carry += $quantity;
    }, 0);



    for ($i = 6; $i > 0; $i--) {
      $dt = Carbon::today()->add(2, 'day')->sub($i, 'day')->toDateString();
      $inboundQty = 0;
      $outboundQty = 0;
      $net = 0;

      $in = $grValueBeforeToday->firstWhere('posting_date', $dt);
      $out = $doValueBeforeToday->firstWhere('posting_date', $dt);

      if ($in) {
        $inboundQty += $in->quantity;
        $net += $in->quantity;
      }
      if ($out) {
        $outboundQty += $out->quantity;
        $net -= $out->quantity;
      }

      $inventoryValues[] = [
        'quantity' =>  $net,
        'posting_date' => $dt
      ];

      $inOutQty[] = [
        'inbound' => $inboundQty,
        'outbound' => $outboundQty,
        'posting_date' => $dt
      ];
    }

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
      'inventoryValues' => $inventoryValues,
      'inbounds' => $inbounds,
      'outbounds' => $outbounds,
      'inboundQty' => $inboundQty,
      'outboundQty' => $outboundQty,
      'receiveValue' => $receiveValue,
      'doBeforeToday' => $doValueBeforeToday,
      'grBeforeToday' => $grValueBeforeToday,
      'inOutQty' => $inOutQty,
      // 'outboundValue' => $outboundValueBeforeToday,
    ]);
  }
}
