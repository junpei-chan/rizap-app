<?php
/**
 * Router for PHP built-in server
 * Handles health checks immediately without loading Laravel
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Health check - respond immediately
if ($uri === '/health' || ($uri === '/' && $_SERVER['REQUEST_METHOD'] === 'HEAD')) {
    http_response_code(200);
    header('Content-Type: text/plain');
    echo 'OK';
    exit;
}

// Serve static files directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Forward to Laravel
require_once __DIR__ . '/index.php';
