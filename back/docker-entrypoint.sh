#!/bin/sh

# ポートの設定（Renderから渡される $PORT を優先）
PORT="${PORT:-8000}"

echo "[entrypoint] PORT=${PORT}"
echo "[entrypoint] DB_HOST=${DB_HOST}"
echo "[entrypoint] DB_CONNECTION=${DB_CONNECTION}"

# マイグレーション実行（テーブル作成）
echo "[entrypoint] Running migrations..."
php artisan migrate --force || echo "[entrypoint] Migration failed or skipped"

# ルートキャッシュのみ（configキャッシュはスキップ）
echo "[entrypoint] Caching routes..."
php artisan route:cache || echo "[entrypoint] Route cache failed"

echo "[entrypoint] Starting PHP server on 0.0.0.0:${PORT}..."

# PHPの組み込みサーバーをフォアグラウンドで実行
# - メモリ制限: 256MB
# - 実行時間制限: 120秒
# - OPcache有効化
exec php \
    -d memory_limit=256M \
    -d max_execution_time=120 \
    -d opcache.enable=1 \
    -d opcache.enable_cli=1 \
    -d opcache.memory_consumption=128 \
    -d opcache.max_accelerated_files=10000 \
    -d opcache.validate_timestamps=0 \
    -S 0.0.0.0:${PORT} -t public