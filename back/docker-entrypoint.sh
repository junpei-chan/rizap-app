#!/bin/sh
set -e

echo "[entrypoint] Environment:"
env

# オートローダ最適化
echo "[entrypoint] Running composer dump-autoload --optimize"
composer dump-autoload --optimize || echo "[entrypoint] composer dump-autoload failed"

# package discovery（失敗しても継続）
echo "[entrypoint] Running php artisan package:discover"
php artisan package:discover --ansi || echo "[entrypoint] package:discover failed"

# マイグレーションは任意。必要ならアンコメントして実行。
# echo "[entrypoint] Running migrations"
# php artisan migrate --force || echo "[entrypoint] migrate failed"

# 最後にアプリケーションを起動（exec で置き換え）
PORT="${PORT:-8000}"
echo "[entrypoint] Starting php artisan serve on 0.0.0.0:${PORT}"
exec php artisan serve --host=0.0.0.0 --port=${PORT}
