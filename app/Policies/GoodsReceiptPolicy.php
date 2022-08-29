<?php

namespace App\Policies;

use App\Models\GoodsReceipt;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GoodsReceiptPolicy
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
    if ($user->can('viewAll_GoodsReceipt')) {
      return true;
    }
  }

  /**
   * Determine whether the user can view the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\GoodsReceipt  $receipt
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function view(User $user, GoodsReceipt $receipt)
  {
    if ($user->can('view_GoodsReceipt')) {
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
    if ($user->can('create_GoodsReceipt')) {
      return true;
    }
  }

  /**
   * Determine whether the user can update the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\GoodsReceipt  $receipt
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function update(User $user, GoodsReceipt $receipt)
  {
    if ($user->can('update_GoodsReceipt')) {
      return true;
    }
  }

  /**
   * Determine whether the user can delete the model.
   *
   * @param  \App\Models\User  $user
   * @param  \App\Models\GoodsReceipt  $receipt
   * @return \Illuminate\Auth\Access\Response|bool
   */
  public function delete(User $user, GoodsReceipt $receipt)
  {
    if ($user->can('delete_GoodsReceipt')) {
      return true;
    }
  }
}
