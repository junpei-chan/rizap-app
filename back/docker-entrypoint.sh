echo "[entrypoint] Running composer dump-autoload --optimize"
echo "[entrypoint] Running php artisan package:discover"
#!/bin/sh
set -e

echo "[entrypoint] Environment:"
env

# デフォルトポート
PORT="${PORT:-8000}"

echo "[entrypoint] Running composer dump-autoload --optimize"
composer dump-autoload --optimize || echo "[entrypoint] composer dump-autoload failed"

echo "[entrypoint] Running php artisan package:discover"
php artisan package:discover --ansi || echo "[entrypoint] package:discover failed"

# マイグレーションは任意。必要ならアンコメントして実行。
# echo "[entrypoint] Running migrations"
# php artisan migrate --force || echo "[entrypoint] migrate failed"

echo "[entrypoint] Trying to start using 'php artisan serve' on 0.0.0.0:${PORT}"
if php artisan serve --host=0.0.0.0 --port=${PORT}; then
	echo "[entrypoint] php artisan serve exited normally"
	exit 0
else
	echo "[entrypoint] php artisan serve failed, falling back to built-in PHP server"
	echo "[entrypoint] Starting php -S 0.0.0.0:${PORT} -t public"
	exec php -S 0.0.0.0:${PORT} -t public
fi
