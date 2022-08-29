<?php

namespace App\Policies;

use App\Models\OutboundDelivery;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OutboundDeliveryPolicy
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
    if ($user->can('viewAll_OutboundDelivery')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\OutboundDelivery  $outbound
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, OutboundDelivery $outbound)
  {
    if ($user->can('view_OutboundDelivery')) {
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
    if ($user->can('create_OutboundDelivery')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\OutboundDelivery  $outbound
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, OutboundDelivery $outbound)
  {
    if ($user->can('update_OutboundDelivery')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\OutboundDelivery  $outbound
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, OutboundDelivery $outbound)
  {
    if ($user->can('delete_OutboundDelivery')) {
      return true;
    }
  }
}
