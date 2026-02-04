<?php

namespace App\Http\Controllers;

use App\Models\HouseworkLog;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function store(Request $request){

        $user = $request->user();

                if (! $user) {
            return response()->json([
                'success' => false,
                'message' => '認証されていません。',
            ], 401);
        }
        $data = $request->all();

        $validated = validator($data, [
            '*.housework_id' => 'required|integer|exists:houseworks,id',
            '*.done_at'     => 'nullable|date',
        ])->validate();

        foreach ($validated as $item) {
            HouseworkLog::updateOrCreate(
                [
                    'user_id'      => $user->id,
                    'housework_id' => $item['housework_id'], 
                ],
                [
                    'done_at' => $item['done_at'],
                ]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'ユーザーの初期家事情報を保存しました。',
        ]);
    }
}
