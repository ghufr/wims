<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{

  protected function crud($entity, $methods)
  {
    return collect($methods)->map(function ($item) use ($entity) {
      return ['name' => $item . '_' . $entity, 'guard_name' => 'web'];
    })->toArray();
  }
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
      'Customer'
    ];
    $methods = ['viewAll', 'view', 'create', 'delete', 'update'];

    $permissions = [];
    $readOnlyPermissions = [];

    foreach ($models as $model) {
      $permissions = [...$permissions, ...$this->crud($model, $methods)];
      $readOnlyPermissions =  [...$readOnlyPermissions, ...['view_' . $model, 'viewAll_' . $model]];
    }

    $permissions = [...$permissions, ...$this->crud('Dashboard', ['view', 'viewAll']), ...$this->crud('User', $methods), ...$this->crud('Inventory', ['view', 'viewAll'])];

    Permission::insertOrIgnore($permissions);

    $adminRole = Role::create(['name' => 'super-admin']);
    $adminRole->givePermissionTo(Permission::all());

    $staffRole = Role::create(['name' => 'staff']);
    $staffRole->givePermissionTo(['create_GoodsReceipt', 'create_DeliveryOrder', ...$readOnlyPermissions]);

    $managerRole = Role::create(['name' => 'manager']);
    $managerRole->givePermissionTo(['view_Dashboard', 'viewAll_Dashboard', ...$readOnlyPermissions]);

    $admin = User::factory()->create([
      'name' => 'Ghufron',
      'email' => 'ghufronfr@gmail.com',
      'password' => Hash::make('admin123')
    ]);

    $users = User::factory(10)->create();

    collect($users)->map(function ($user) {
      $role = rand(0, 1) == 1 ? 'staff' : 'manager';
      $user->assignRole($role);
    });

    $admin->assignRole('super-admin');
  }
}
