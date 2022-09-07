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
    $this->authorize('viewAll', User::class);

    return Inertia::render('Master/Users/Index', [
      'users' => User::with('roles:id,name')->orderBy('created_at', 'desc')->get()->makeHidden(['password'])
    ]);
  }

  public function create()
  {
    $this->authorize('create', User::class);

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
    $this->authorize('create', User::class);

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => ['required', Rules\Password::defaults()],
      'role' => 'required|string'
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    $user->assignRole($validated['role']);

    event(new Registered($user));

    // Auth::login($user);

    return Redirect::route('master.users.index');
  }

  public function show($id)
  {
    $this->authorize('view', $id);

    // $permissions = Permission::all()->groupBy(function ($item, $key) {
    //   return explode('_', $item['name'])[1];
    // });

    // $roles = Role::all();

    return response()->json([
      'user' => User::where('id', $id)->with('roles:id,name')->firstOrFail()->makeHidden(['password']),
    ]);

    // return Inertia::render('Master/Users/Create', [
    //   "userData" => $user->load('roles:id,name')->firstOrFail()->makeHidden(['password']),
    //   'permissions' => $permissions,
    //   'roles' => $roles,
    // ]);
  }

  public function update(Request $request, User $user)
  {
    $this->authorize('update', $user);

    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
      'password' => ['sometimes', Rules\Password::defaults()],
      'role' => 'required|string'
    ]);

    $user->update([
      'name' => $request->name,
      'email' => $request->email,
      'password' => $request->password ? Hash::make($request->password) : $user->password,
    ]);

    $user->syncRoles([$validated['role']]);

    return Redirect::route('master.users.index');
  }

  public function destroy($id)
  {
    $this->authorize('delete', $id);

    $ids = explode(',', $id);
    User::whereIn('id', $ids)->delete();
    return Redirect::route('master.users.index');
  }
}
