<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\ConvertRequestKeysToSnakeCase;
use App\Http\Middleware\ConvertResponseKeysToCamelCase;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // APIリクエストのcamelCase→snake_case変換
        $middleware->append(ConvertRequestKeysToSnakeCase::class);
        // APIレスポンスのsnake_case→camelCase変換
        $middleware->append(ConvertResponseKeysToCamelCase::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
