<?php

return [

  /*
  |--------------------------------------------------------------------------
  | Cross-Origin Resource Sharing (CORS) Configuration
  |--------------------------------------------------------------------------
  |
  | ここでは、フロントエンド（Next.js）からのクロスオリジンHTTPリクエストを
  | 処理する方法を設定します。許可されたオリジン、メソッド、ヘッダーなどを
  | 指定できます。
  |
  */

  'paths' => ['api/*', 'sanctum/csrf-cookie'],

  'allowed_methods' => ['*'],

  'allowed_origins' => [
    env('FRONTEND_URL', 'https://rizap-app.vercel.app/'),
  ],

  'allowed_origins_patterns' => [],

  'allowed_headers' => ['*'],

  'exposed_headers' => [],

  'max_age' => 0,

  'supports_credentials' => true,
];
