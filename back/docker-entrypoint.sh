echo "[entrypoint] Running composer dump-autoload --optimize"
echo "[entrypoint] Running php artisan package:discover"
#!/bin/sh
# デバッグモード: 実行コマンドを出力
set -x

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

echo "[entrypoint] Attempting to start 'php artisan serve' on 0.0.0.0:${PORT} (background)"
php artisan serve --host=0.0.0.0 --port=${PORT} &
ARTISAN_PID=$!
sleep 2
if kill -0 "$ARTISAN_PID" 2>/dev/null; then
	echo "[entrypoint] php artisan serve started (pid=${ARTISAN_PID}), waiting..."
	wait "$ARTISAN_PID"
	EXIT_CODE=$?
	echo "[entrypoint] php artisan serve exited with ${EXIT_CODE}"
	# そのまま終了して再デプロイ時に再試行されるため、ここでは終了する
	exit "$EXIT_CODE"
else
	echo "[entrypoint] php artisan serve failed to start (pid=${ARTISAN_PID}), trying built-in PHP server"
	php -S 0.0.0.0:${PORT} -t public &
	PHP_PID=$!
	sleep 2
	if kill -0 "$PHP_PID" 2>/dev/null; then
		echo "[entrypoint] php -S started (pid=${PHP_PID}), waiting..."
		wait "$PHP_PID"
		exit_code=$?
		echo "[entrypoint] php -S exited with ${exit_code}"
		exit "$exit_code"
	else
		echo "[entrypoint] both servers failed to start. Dumping process list and keeping container alive for debugging."
		ps aux || true
		echo "[entrypoint] Tail logs to keep container alive"
		tail -f /dev/null
	fi
fi
