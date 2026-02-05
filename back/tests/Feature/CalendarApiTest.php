<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Housework;
use App\Models\HouseworkLog;
use Carbon\Carbon;

class CalendarApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_指定した年月の家事ログと合計カロリーが取得できる()
    {
        $user = User::create([
            'id'       => 1,
            'email'    => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $clean = Housework::create(['name' => '掃除']);
        $wash  = Housework::create(['name' => '洗濯']);

        HouseworkLog::create([
            'user_id'      => 1,
            'housework_id' => $clean->id,
            'calorie'      => 100,
            'done_at'      => Carbon::create(2026, 2, 5, 10, 0, 0),
        ]);

        HouseworkLog::create([
            'user_id'      => 1,
            'housework_id' => $wash->id,
            'calorie'      => 200,
            'done_at'      => Carbon::create(2026, 2, 20, 15, 30, 0),
        ]);

        HouseworkLog::create([
            'user_id'      => 1,
            'housework_id' => $clean->id,
            'calorie'      => 999,
            'done_at'      => Carbon::create(2026, 3, 1, 0, 0, 0),
        ]);

        $response = $this->getJson('/api/calendar?year=2026&month=2');

        $response->assertStatus(200)
                 ->assertJson([
                     'year'          => 2026,
                     'month'         => 2,
                     'total_calorie' => 300,
                 ]);

        $logs = $response->json('logs');
        $this->assertCount(2, $logs);
        $this->assertEquals('掃除', $logs[0]['housework_name']);
        $this->assertEquals(100,  $logs[0]['calorie']);
    }

    public function test_年月が未指定ならバリデーションエラーになる()
    {
        $response = $this->getJson('/api/calendar');

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['year', 'month']);
    }

    public function test_指定した日付の家事ログと合計カロリーが取得できる()
    {
        User::create([
            'id'       => 1,
            'email'    => 'test2@example.com',
            'password' => bcrypt('password123'),
        ]);

        $clean = Housework::create(['name' => '掃除']);
        $wash  = Housework::create(['name' => '洗濯']);

        HouseworkLog::create([
            'user_id'      => 1,
            'housework_id' => $clean->id,
            'calorie'      => 50,
            'done_at'      => Carbon::create(2026, 2, 10, 8, 0, 0),
        ]);

        HouseworkLog::create([
            'user_id'      => 1,
            'housework_id' => $wash->id,
            'calorie'      => 80,
            'done_at'      => Carbon::create(2026, 2, 10, 21, 30, 0),
        ]);

        HouseworkLog::create([
            'user_id'      => 1,
            'housework_id' => $clean->id,
            'calorie'      => 999,
            'done_at'      => Carbon::create(2026, 2, 9, 23, 59, 59),
        ]);

        $response = $this->getJson('/api/calendar/date?date=2026-02-10');

        $response->assertStatus(200)
                 ->assertJson([
                     'date'          => '2026-02-10',
                     'total_calorie' => 130,
                 ]);

        $logs = $response->json('logs');
        $this->assertCount(2, $logs);
        $this->assertEquals('掃除', $logs[0]['housework_name']);
        $this->assertEquals('洗濯', $logs[1]['housework_name']);
    }

    public function test_日付が未指定ならバリデーションエラーになる()
    {
        $response = $this->getJson('/api/calendar/date');

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['date']);
    }
}

