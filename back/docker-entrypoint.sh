#!/bin/sh
set -e # エラーが発生したら即停止

# ポートの設定（Renderから渡される $PORT を優先）
PORT="${PORT:-8000}"

echo "[entrypoint] Running composer dump-autoload"
composer dump-autoload --optimize

echo "[entrypoint] Running php artisan package:discover"
php artisan package:discover --ansi

# マイグレーション実行（テーブル作成）
echo "[entrypoint] Running migrations..."
php artisan migrate --force

# キャッシュ作成（マイグレーション後に実行）
echo "[entrypoint] Caching config and routes..."
php artisan config:cache
php artisan route:cache

echo "[entrypoint] Starting PHP server on port ${PORT}..."

# PHPの組み込みサーバーをフォアグラウンドで実行
exec php -S 0.0.0.0:${PORT} -t public