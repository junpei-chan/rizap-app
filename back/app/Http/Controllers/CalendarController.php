<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\HouseworkLog;

class CalendarController extends Controller
{
    public function index(Request $request){
        $request->validate([
            'year'  => 'required|integer',
            'month' => 'required|integer|min:1|max:12',
        ]);

        $user_id = auth()->id();
    

        // 対象月の範囲
        $start = Carbon::create($request->year, $request->month, 1)->startOfMonth();
        $end   = Carbon::create($request->year, $request->month, 1)->endOfMonth();

        // 対象ログ取得（完了済みのみ）
        $logs = HouseworkLog::with('housework')
            ->where('user_id', $user_id)
            ->whereNotNull('done_at')
            ->whereBetween('done_at', [$start, $end])
            ->orderBy('done_at')
            ->get();

        // 合計カロリー
        $totalCalorie = $logs->sum('calorie');

        // 整形
        $formattedLogs = $logs->map(function ($log) {
            return [
                'housework_name' => $log->housework->name,
                'calorie'        => $log->calorie,
                'done_at'        => $log->done_at,
            ];
        });

        return response()->json([
            'year'           => $request->year,
            'month'          => $request->month,
            'total_calorie'  => $totalCalorie,
            'logs'           => $formattedLogs,
        ]);
    }

    public function one(Request $request)
    {
        $request->validate([
            'date' => 'required|date', // 例: 2026-02-04
        ]);

        $user_id = auth()->id();
        

        // 対象日の開始・終了
        $start = Carbon::parse($request->date)->startOfDay();
        $end   = Carbon::parse($request->date)->endOfDay();

        // 完了済みログ取得
        $logs = HouseworkLog::with('housework')
            ->where('user_id', $user_id)
            ->whereNotNull('done_at')
            ->whereBetween('done_at', [$start, $end])
            ->orderBy('done_at')
            ->get();

        // 合計カロリー
        $totalCalorie = $logs->sum('calorie');

        // 整形
        $formattedLogs = $logs->map(function ($log) {
            return [
                'housework_name' => $log->housework->name,
                'calorie'        => $log->calorie,
                'done_at'        => $log->done_at,
            ];
        });

        return response()->json([
            'date'          => $request->date,
            'total_calorie' => $totalCalorie,
            'logs'          => $formattedLogs,
        ]);
    }
}
