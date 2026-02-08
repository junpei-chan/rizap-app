#!/bin/sh
set -e # エラーが発生したら即停止

# ポートの設定（Renderから渡される $PORT を優先）
PORT="${PORT:-8000}"

echo "[entrypoint] PORT=${PORT}"
echo "[entrypoint] DB_HOST=${DB_HOST}"
echo "[entrypoint] DB_CONNECTION=${DB_CONNECTION}"

# composer scriptsをスキップしてautoloadのみ生成
echo "[entrypoint] Running composer dump-autoload (no-scripts)..."
composer dump-autoload --optimize --no-scripts

echo "[entrypoint] Running package:discover..."
php artisan package:discover --ansi

# マイグレーション実行（テーブル作成）
echo "[entrypoint] Running migrations..."
php artisan migrate --force

# キャッシュ作成（マイグレーション後に実行）
echo "[entrypoint] Caching config and routes..."
php artisan config:cache
php artisan route:cache

echo "[entrypoint] Starting PHP server on 0.0.0.0:${PORT}..."

# PHPの組み込みサーバーをフォアグラウンドで実行
exec php -S 0.0.0.0:${PORT} -t public