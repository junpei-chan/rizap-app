<?php
/**
 * Router for PHP built-in server
 * Handles health checks immediately without loading Laravel
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Log all requests
error_log("[router] {$_SERVER['REQUEST_METHOD']} {$uri}");

// Health check - respond immediately
if ($uri === '/health' || ($uri === '/' && $_SERVER['REQUEST_METHOD'] === 'HEAD')) {
    http_response_code(200);
    header('Content-Type: text/plain');
    echo 'OK';
    exit;
}

// Test endpoint - responds without loading Laravel
if ($uri === '/api/ping') {
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'message' => 'pong', 'time' => date('Y-m-d H:i:s')]);
    exit;
}

// Serve static files directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Forward to Laravel
error_log("[router] Forwarding to Laravel...");
require_once __DIR__ . '/index.php';
