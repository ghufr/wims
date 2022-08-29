<?php

namespace App\Policies;

use App\Models\Vendor;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class VendorPolicy
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
    if ($user->can('viewAll_Vendor')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Vendor  $vendor
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, Vendor $vendor)
  {
    if ($user->can('view_Vendor')) {
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
    if ($user->can('create_Vendor')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Vendor  $vendor
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, Vendor $vendor)
  {
    if ($user->can('update_Vendor')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Vendor  $vendor
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, Vendor $vendor)
  {
    if ($user->can('delete_Vendor')) {
      return true;
    }
  }
}
