FROM php:8.4
WORKDIR /back

# composer をインストール
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_PROCESS_TIMEOUT=2000
ENV COMPOSER_MEMORY_LIMIT=-1

# システムパッケージのインストール
RUN apt-get update && \
    apt-get install -y zip unzip git libpq-dev && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-install pdo_mysql pdo_pgsql pgsql

# まずアプリケーションのソースをコピー（リポジトリルートをビルドコンテキストにしている場合）
# back ディレクトリのみをコンテキストからコピーする
COPY back/ .

# Composer 依存関係をインストール（build 時に vendor を最終イメージに含める）
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-progress --no-suggest

# 実行コマンド
CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
EXPOSE 8000
