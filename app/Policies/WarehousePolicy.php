<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Auth\Access\HandlesAuthorization;

class WarehousePolicy
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
    if ($user->can('viewAll_Warehouse')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Warehouse  $warehouse
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, Warehouse $warehouse)
  {
    if ($user->can('view_Warehouse')) {
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
    if ($user->can('create_Warehouse')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Warehouse  $warehouse
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, Warehouse $warehouse)
  {
    if ($user->can('update_Warehouse')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Warehouse  $warehouse
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, Warehouse $warehouse)
  {
    if ($user->can('delete_Warehouse')) {
      return true;
    }
  }
}
