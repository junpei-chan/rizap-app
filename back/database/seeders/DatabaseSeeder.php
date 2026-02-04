<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Housework;
use App\Models\HouseworkLog;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // =====================
        // ユーザー
        // =====================
        $user = User::create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'meal_frequency' => 2,
        ]);

        // =====================
        // 家事マスタ
        // =====================
        $houseworks = collect([
            '洗い物',
            '洗濯',
            'ゴミ捨て',
            '床掃除',
            '整理整頓',
            '風呂掃除',
            'トイレ掃除',
            'その他',
        ])->map(fn ($name) =>
            Housework::create(['name' => $name])
        );

        // =====================
        // 家事ログ
        // =====================

        // 完了済み（今日）
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $houseworks[0]->id,
            'done_at' => now()->subMinutes(10),
            'calorie' => 80,
        ]);

        // 起動中（done_at = null）
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $houseworks[1]->id,
            'done_at' => null,
            'calorie' => 0,
        ]);

        // 昨日完了
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $houseworks[2]->id,
            'done_at' => now()->subDay(),
            'calorie' => 120,
        ]);
    }
}

