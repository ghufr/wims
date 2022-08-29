<?php

namespace App\Policies;

use App\Models\Location;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LocationPolicy
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
    if ($user->can('viewAll_Location')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Location  $location
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, Location $location)
  {
    if ($user->can('view_Location')) {
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
    if ($user->can('create_Location')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Location  $location
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, Location $location)
  {
    if ($user->can('update_Location')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Location  $location
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, Location $location)
  {
    if ($user->can('delete_Location')) {
      return true;
    }
  }
}
