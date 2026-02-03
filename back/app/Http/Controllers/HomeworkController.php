<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HouseworkLog;

class HomeworkController extends Controller
{
    public function index(Request $request){
        $request->validate([
            'homework_id' => 'nullable|exists:houseworks,id',
        ]);
        // $user_id = auth()->id(); //ログインしたら、下のコード一行を消し、こちらをオンにする
        //そしてapi.phpのミドルウェアを解除する
        $user_id = 1;

        $homework_id = $request->input('homework_id');
        if($homework_id){
            $log = \DB::table('housework_logs')
                ->where('user_id', $user_id)
                ->where('housework_id', $homework_id)
                ->orderBy('updated_at', 'desc')
                ->first();

            return response()->json([
                'homework_id' => $homework_id,
                'done_at' => $log?->done_at,
            ]);
        }

        $last_done_list = \DB::table('housework_logs')
            ->where('user_id', $user_id)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->unique('housework_id')
            ->values();

        return response()->json([
            'data' => $last_done_list
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'housework_id' => 'required|integer|exists:houseworks,id',
        ]);

        //$user_id = auth()->id(); 本来はこれ
        $user_id = 1;

        // すでに起動中のログがあるかチェック（多重起動防止）
        $alreadyRunning = HouseworkLog::where('user_id', $user_id)
            ->where('housework_id', $request->housework_id)
            ->whereNull('done_at')
            ->exists();

        if ($alreadyRunning) {
            return response()->json([
                'message' => 'already running'
            ], 409);
        }

        // 起動ログ作成
        HouseworkLog::create([
            'user_id' => $user_id,
            'housework_id' => $request->housework_id,
            'done_at' => null, // ← 起動中状態
        ]);

        return response()->json([
            'message' => 'homework started'
        ], 201);
    }

    public function update(){
        
    }
}
