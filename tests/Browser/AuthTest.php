<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class AuthTest extends DuskTestCase
{
  use DatabaseMigrations;
  /**
   * A Dusk test example.
   *
   * @return void
   */
  public function testExample()
  {
    $user = User::factory()->create([
      'email' => 'test@gmail.com'
    ]);

    $this->browse(function (Browser $browser) use ($user) {
      $browser->visit('/')
        ->waitForEvent('inertia:navigate', 'document')
        ->type('email', $user->email)
        ->type('password', 'user123')
        ->press('LOG IN')
        ->waitForEvent('inertia:navigate', 'document')
        ->assertRouteIs('dashboard');
    });
  }
}
