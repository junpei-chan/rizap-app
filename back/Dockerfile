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

# コンテキストがルートか `back` のどちらでも動作するように、
# まず全コンテキストを /tmp/context にコピーし、存在するパスを /back に移す
COPY . /tmp/context

RUN mkdir -p /back && \
        if [ -d /tmp/context/back ]; then \
            cp -a /tmp/context/back/. /back/; \
        else \
            cp -a /tmp/context/. /back/; \
        fi && \
        rm -rf /tmp/context

# Composer 依存関係をインストール（build 時に vendor を最終イメージに含める）
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-progress --no-suggest --no-scripts

# エントリポイントをコピーして実行
COPY docker-entrypoint.sh /back/docker-entrypoint.sh
RUN chmod +x /back/docker-entrypoint.sh
ENTRYPOINT ["/back/docker-entrypoint.sh"]

# デフォルトのコマンド（ENTRYPOINT 内で exec するため通常は不要だが明示）
CMD [""]
EXPOSE 8000
