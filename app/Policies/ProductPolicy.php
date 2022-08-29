<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
  use HandlesAuthorization;

  /**
   * Determine whether the user can view any models.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function viewAll(User $user)
  {
    if ($user->can('viewAll_Product')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, Product $product)
  {
    if ($user->can('view_Product')) {
      return true;
    }
  }

  /**
   * Determine whether the user can create models.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function create(User $user)
  {
    if ($user->can('create_Product')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, Product $product)
  {
    if ($user->can('update_Product')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Product  $product
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, Product $product)
  {
    if ($user->can('delete_Product')) {
      return true;
    }
  }
}
