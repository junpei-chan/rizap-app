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
            'meal_frequency' => 2
        ]);

        // =====================
        // 家事マスタ（固定8個）
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
        ])->map(fn($name) => Housework::create(['name' => $name]));

        // 取り出しやすく
        $dishwashing = $houseworks[0];
        $laundry     = $houseworks[1];
        $trash       = $houseworks[2];

        // =====================
        // 家事ログ（状態テスト）
        // =====================

        // 完了済み
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $dishwashing->id,
            'done_at' => now()->subMinutes(10),
        ]);

        // 起動中
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $laundry->id,
            'done_at' => null,
        ]);

        // 昨日完了
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $trash->id,
            'done_at' => now()->subDay(),
        ]);
    }
}
