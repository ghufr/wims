docker-compoe build app
docker-compose down && docker-compose up -d
docker-compose exec app php artisan migrate:fresh --seed
docker-compose exec app npm run build
