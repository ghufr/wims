<?php

namespace App\Policies;

use App\Models\InboundDelivery;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InboundDeliveryPolicy
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
    if ($user->can('viewAll_InboundDelivery')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\InboundDelivery  $inbound
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, InboundDelivery $inbound)
  {
    if ($user->can('view_InboundDelivery')) {
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
    if ($user->can('create_InboundDelivery')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\InboundDelivery  $inbound
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, InboundDelivery $inbound)
  {
    if ($user->can('update_InboundDelivery')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\InboundDelivery  $inbound
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, InboundDelivery $inbound)
  {
    if ($user->can('delete_InboundDelivery')) {
      return true;
    }
  }
}
