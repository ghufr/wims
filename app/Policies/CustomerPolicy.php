<?php

namespace App\Policies;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerPolicy
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
    if ($user->can('viewAll_Customer')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Customer  $customer
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, Customer $customer)
  {
    if ($user->can('view_Customer')) {
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
    if ($user->can('create_Customer')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Customer  $customer
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, Customer $customer)
  {
    if ($user->can('update_Customer')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\Customer  $customer
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, Customer $customer)
  {
    if ($user->can('delete_Customer')) {
      return true;
    }
  }
}
