<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Inertia\Inertia;

class InventoryController extends Controller
{
  public function index()
  {
    $this->authorize('viewAll', Inventory::class);

    return Inertia::render('Inventory/List/Index', [
      'inventories' => Inventory::with(['product:id,name', 'warehouse:id,name', 'location:id,name', 'client:id,name'])->orderBy('updated_at', 'desc')->get()
    ]);
  }
}
