#!/bin/sh

# ポートの設定（Renderから渡される $PORT を優先）
PORT="${PORT:-8000}"

echo "[entrypoint] PORT=${PORT}"

# Laravelキャッシュを生成（これにより毎リクエストのパースを省略）
echo "[entrypoint] Generating Laravel caches..."
php artisan config:cache || echo "[entrypoint] config:cache failed"
php artisan route:cache || echo "[entrypoint] route:cache failed"
php artisan view:cache || echo "[entrypoint] view:cache failed"

echo "[entrypoint] Starting PHP server on 0.0.0.0:${PORT} with router.php..."

# PHPの組み込みサーバーをフォアグラウンドで実行（router.phpを使用）
exec php \
    -d memory_limit=-1 \
    -d max_execution_time=300 \
    -d opcache.enable=1 \
    -d opcache.enable_cli=1 \
    -d opcache.memory_consumption=128 \
    -d opcache.max_accelerated_files=10000 \
    -d opcache.validate_timestamps=0 \
    -d opcache.revalidate_freq=0 \
    -S 0.0.0.0:${PORT} -t public public/router.php