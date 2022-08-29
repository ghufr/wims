<?php

namespace App\Policies;

use App\Models\Inventory;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InventoryPolicy
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
    if ($user->can('viewAll_Inventory')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Inventory  $inventory
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, Inventory $inventory)
  {
    if ($user->can('view_Inventory')) {
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
    if ($user->can('create_Inventory')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Inventory  $inventory
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, Inventory $inventory)
  {
    if ($user->can('update_Inventory')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Inventory  $inventory
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, Inventory $inventory)
  {
    if ($user->can('delete_Inventory')) {
      return true;
    }
  }
}
