#!/bin/sh
set -e # エラーが発生したら即停止

# ポートの設定（Renderから渡される $PORT を優先）
PORT="${PORT:-8000}"

echo "[entrypoint] Running composer dump-autoload"
composer dump-autoload --optimize

echo "[entrypoint] Running php artisan package:discover"
php artisan package:discover --ansi

# キャッシュクリア（念のため）
php artisan config:cache
php artisan route:cache

echo "[entrypoint] Starting PHP server on port ${PORT}..."

# 1. 開発用サーバーではなく、PHPの組み込みサーバーをフォアグラウンドで実行
# これにより、このプロセスが動いている限りコンテナが維持されます
exec php -S 0.0.0.0:${PORT} -t public