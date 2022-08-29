<?php

namespace App\Policies;

use App\Models\DeliveryOrder;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DeliveryOrderPolicy
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
    if ($user->can('viewAll_DeliveryOrder')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\DeliveryOrder  $order
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, DeliveryOrder $order)
  {
    if ($user->can('view_DeliveryOrder')) {
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
    if ($user->can('create_DeliveryOrder')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\DeliveryOrder  $order
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, DeliveryOrder $order)
  {
    if ($user->can('update_DeliveryOrder')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\DeliveryOrder  $order
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, DeliveryOrder $order)
  {
    if ($user->can('delete_DeliveryOrder')) {
      return true;
    }
  }
}
