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
    return Inertia::render('Master/Users/Create');
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
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
    return Inertia::render('Master/Users/Create', [
      "user" => User::where("id", $id)->first()
    ]);
  }

  public function update(Request $request, User $user)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user->update([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'role' => ''
    ]);

    return Redirect::route('master.products.index');
  }

  public function destroy($id)
  {
    $ids = explode(',', $id);
    User::whereIn('id', $ids)->delete();
    return Redirect::route('master.products.index');
  }
}
