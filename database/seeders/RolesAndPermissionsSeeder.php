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
      'Inbound', 'Outbound',
      'Receipt', 'Delivery',
      'Product', 'Location',
      'Warehouse', 'Vendor',
      'Customer', 'User'
    ];
    $methods = ['viewAll', 'view', 'create', 'delete', 'update'];

    $permissions = [];


    foreach ($models as $model) {
      foreach ($methods as $method) {
        array_push($permissions, ['name' => $method . '_' . $model, 'guard_name' => 'web']);
      }
    }

    Permission::insertOrIgnore($permissions);

    $adminRole = Role::create(['name' => 'super-admin']);
    $adminRole->givePermissionTo(Permission::all());

    $admin = User::factory()->create([
      'name' => 'Ghufron',
      'email' => 'ghufronfr@gmail.com',
      'password' => Hash::make('admin123')
    ]);

    $users = User::factory()->count(5)->create();

    collect($users)->map(function ($user) {
      $user->givePermissionTo(['create_Receipt', 'create_Delivery']);
    });

    $admin->assignRole('super-admin');
  }
}
