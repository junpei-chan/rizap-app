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
            'password' => 'password', // 自動でハッシュ化される
            'meal_frequency' => 2
        ]);

        // =====================
        // 家事マスタ
        // =====================
        $cleaning = Housework::create(['name' => '掃除']);
        $laundry  = Housework::create(['name' => '洗濯']);
        $cooking  = Housework::create(['name' => '料理']);

        // =====================
        // 家事ログ（状態テスト用）
        // =====================

        // ① 掃除 → 完了済み
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $cleaning->id,
            'done_at' => now()->subMinutes(10),
        ]);

        // ② 洗濯 → 起動中（done_at = null）
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $laundry->id,
            'done_at' => null,
        ]);

        // ③ 料理 → 昨日完了
        HouseworkLog::create([
            'user_id' => $user->id,
            'housework_id' => $cooking->id,
            'done_at' => now()->subDay(),
        ]);
    }
}