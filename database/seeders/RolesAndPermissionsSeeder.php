<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    $models = [
      'InboundDelivery', 'OutboundDelivery',
      'GoodsReceipt', 'DeliveryOrder',
      'Product', 'Location',
      'Warehouse', 'Vendor',
      'Customer', 'User'
    ];
    $methods = ['viewAll', 'view', 'create', 'delete', 'update'];

    $permissions = [];
    $staffPermissions = [];

    foreach ($models as $model) {
      foreach ($methods as $method) {
        array_push($permissions, ['name' => $method . '_' . $model, 'guard_name' => 'web']);
      }
      array_push($staffPermissions, ...['view_' . $model, 'viewAll_' . $model]);
    }

    Permission::insertOrIgnore($permissions);

    $adminRole = Role::create(['name' => 'super-admin']);
    $adminRole->givePermissionTo(Permission::all());

    $staffRole = Role::create(['name' => 'staff']);
    $staffRole->givePermissionTo(['create_GoodsReceipt', 'create_DeliveryOrder', ...$staffPermissions]);



    $admin = User::factory()->create([
      'name' => 'Ghufron',
      'email' => 'ghufronfr@gmail.com',
      'password' => Hash::make('admin123')
    ]);

    $users = User::factory(5)->create();

    collect($users)->map(function ($user) {
      $user->assignRole('staff');
    });

    $admin->assignRole('super-admin');
  }
}
