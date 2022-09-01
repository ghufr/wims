<?php

namespace Deployer;

require 'recipe/laravel.php';

// Config

set('repository', 'git@github.com:ghufr/wms-2.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('')
  ->set('remote_user', 'deployer')
  ->set('deploy_path', '~/wms');

// Hooks

after('deploy:failed', 'deploy:unlock');
