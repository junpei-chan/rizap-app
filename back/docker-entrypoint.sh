#!/bin/sh

# ポートの設定（Renderから渡される $PORT を優先）
PORT="${PORT:-8000}"

echo "[entrypoint] PORT=${PORT}"

# Laravelキャッシュを生成（これにより毎リクエストのパースを省略）
echo "[entrypoint] Generating Laravel caches..."

echo "[entrypoint] Running config:cache..."
php artisan config:cache 2>&1
CONFIG_EXIT=$?
if [ $CONFIG_EXIT -eq 0 ]; then
    echo "[entrypoint] config:cache SUCCESS"
else
    echo "[entrypoint] config:cache FAILED with exit code $CONFIG_EXIT"
fi

echo "[entrypoint] Running route:cache..."
php artisan route:cache 2>&1
ROUTE_EXIT=$?
if [ $ROUTE_EXIT -eq 0 ]; then
    echo "[entrypoint] route:cache SUCCESS"
else
    echo "[entrypoint] route:cache FAILED with exit code $ROUTE_EXIT"
fi

echo "[entrypoint] Running view:cache..."
php artisan view:cache 2>&1
VIEW_EXIT=$?
if [ $VIEW_EXIT -eq 0 ]; then
    echo "[entrypoint] view:cache SUCCESS"
else
    echo "[entrypoint] view:cache FAILED with exit code $VIEW_EXIT"
fi

# キャッシュファイルの確認
echo "[entrypoint] Checking cache files..."
ls -la bootstrap/cache/ 2>&1 || echo "[entrypoint] bootstrap/cache/ not found"

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