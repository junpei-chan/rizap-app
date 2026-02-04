<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HouseworkLog;

class HouseworkController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'housework_id' => 'nullable|exists:houseworks,id',
        ]);

        //$user_id = auth()->id(); 本来はこれ
        $user_id = 1;

        $housework_id = $request->input('housework_id');
        // ==============================
        // 🔹 家事が1つ指定された場合
        // ==============================
        if ($housework_id) {

            // ① 起動中ログを探す（最優先）
            $runningLog = \DB::table('housework_logs')
                ->where('user_id', $user_id)
                ->where('housework_id', $housework_id)
                ->whereNull('done_at')
                ->latest('created_at')
                ->first();

            if ($runningLog) {
                return response()->json([
                    'housework_id' => $housework_id,
                    'status' => 'running',
                    'done_at' => null,
                ]);
            }

            // ② 完了ログの最新
            $lastDone = \DB::table('housework_logs')
                ->where('user_id', $user_id)
                ->where('housework_id', $housework_id)
                ->whereNotNull('done_at')
                ->latest('done_at')
                ->first();

            return response()->json([
                'housework_id' => $housework_id,
                'status' => 'stopped',
                'done_at' => $lastDone?->done_at,
            ]);
        }

        // ==============================
        // 🔹 全家事の現在状態を返す場合
        // ==============================
        $houseworks = \DB::table('houseworks')->get();

        $result = $houseworks->map(function ($housework) use ($user_id) {

            // 起動中ログ確認
            $runningLog = \DB::table('housework_logs')
                ->where('user_id', $user_id)
                ->where('housework_id', $housework->id)
                ->whereNull('done_at')
                ->latest('created_at')
                ->first();

            if ($runningLog) {
                return [
                    'housework_id' => $housework->id,
                    'name' => $housework->name,
                    'status' => 'running',
                    'done_at' => null,
                ];
            }

            // 完了ログ最新
            $lastDone = \DB::table('housework_logs')
                ->where('user_id', $user_id)
                ->where('housework_id', $housework->id)
                ->whereNotNull('done_at')
                ->latest('done_at')
                ->first();

            return [
                'housework_id' => $housework->id,
                'name' => $housework->name,
                'status' => 'stopped',
                'done_at' => $lastDone?->done_at,
            ];
        });

        return response()->json([
            'data' => $result
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'housework_id' => 'required|integer|exists:houseworks,id',
        ]);

        //$user_id = auth()->id(); 本来はこれ
        $user_id = 1; // 本番は auth()->id()

        // 🔍 その家事がすでに起動中か？
        $alreadyRunning = HouseworkLog::where('user_id', $user_id)
            ->where('housework_id', $request->housework_id)
            ->whereNull('done_at')
            ->exists();

        if ($alreadyRunning) {
            return response()->json([
                'message' => 'already running'
            ], 409);
        }

        // ▶ 起動ログ作成（セッション開始）
        $log = HouseworkLog::create([
            'user_id' => $user_id,
            'housework_id' => $request->housework_id,
            'done_at' => null,
        ]);

        return response()->json([
            'message' => 'housework started',
            'log_id' => $log->id,
            'started_at' => $log->created_at,
        ], 201);
    }


    public function update(Request $request)
    {
        $request->validate([
            'housework_id' => 'required|integer|exists:houseworks,id',
            'calorie' => 'required|integer'
        ]);

        //$user_id = auth()->id(); 本来はこれ
        $user_id = 1;

        // 🔍 起動中ログ取得
        $log = HouseworkLog::where('user_id', $user_id)
            ->where('housework_id', $request->housework_id)
            ->whereNull('done_at')
            ->latest('created_at')
            ->first();

        if (!$log) {
            return response()->json([
                'message' => 'not running'
            ], 404);
        }

        // ⏹ セッション終了 + calorie保存
        $log->update([
            'done_at' => now(),
            'calorie' => $request->calorie,
        ]);

        return response()->json([
            'message' => 'housework stopped',
            'started_at' => $log->created_at,
            'finished_at' => $log->done_at,
            'duration_minutes' => $log->created_at->diffInMinutes($log->done_at),
            'calorie' => $log->calorie,
        ]);
    }
}
