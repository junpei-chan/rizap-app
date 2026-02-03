<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\HomeworkController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('sign_up', [AuthController::class, 'sign_up']);
});

// Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('profile')->group(function () {
        Route::post('meal_frequency', [ProfileController::class, 'store']);
        Route::patch('meal_frequency/edit', [ProfileController::class, 'edit']);
    });

    Route::patch('/room', [RoomController::class, 'store']);

    Route::prefix('homework')->group(function () {
        Route::get('/', [HomeworkController::class, 'index']);
        Route::patch('start', [HomeworkController::class, 'store']);
        Route::patch('end', [HomeworkController::class, 'update']);
    });
// });
