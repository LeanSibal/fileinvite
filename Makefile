build:
	chmod -R 777 storage
	if [ -d bootstrap/cache ] ; then \
		chmod -R 777 bootstrap/cache ; \
	fi
	composer install
	php artisan down
	yarn install
	npm run production
	php artisan vendor:publish --all
	php artisan storage:link --env=local --no-interaction
	php artisan migrate --env=local --no-interaction
	php artisan up

docker-logs:
	rm -rf /code/storage/logs/laravel.log
	tail --retry --follow=name /code/storage/logs/laravel.log
