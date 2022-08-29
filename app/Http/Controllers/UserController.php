<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
  public function index()
  {

    return Inertia::render('Master/Users/Index', [
      'users' => User::all()->makeHidden(['password'])
    ]);
  }

  public function create()
  {
    $permissions = Permission::all()->groupBy(function ($item, $key) {
      return explode('_', $item['name'])[1];
    });
    $roles = Role::all();

    return Inertia::render('Master/Users/Create', [
      'roles' => $roles,
      'permissions' => $permissions,
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => ['required', Rules\Password::defaults()],
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    Auth::login($user);

    return Redirect::route('master.users.index');
  }

  public function show($id)
  {
    $permissions = Permission::all()->groupBy(function ($item, $key) {
      return explode('_', $item['name'])[1];
    });

    $roles = Role::all();

    return Inertia::render('Master/Users/Create', [
      "user" => User::where("id", $id)->first()->makeHidden(['password']),
      'permissions' => $permissions,
      'roles' => $roles,
    ]);
  }

  public function update(Request $request, User $user)
  {

    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
      // 'permissions'
    ]);

    // 'edit article, create user, edit user'

    // $user->givePermissionTo('');

    $user->update([
      'name' => $request->name,
      'email' => $request->email,
      'password' => $request->password ? Hash::make($request->password) : $user->password,
    ]);

    return Redirect::route('master.users.index');
  }

  public function destroy($id)
  {
    $ids = explode(',', $id);
    User::whereIn('id', $ids)->delete();
    return Redirect::route('master.users.index');
  }
}
