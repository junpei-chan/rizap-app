<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function store(Request $request){
            $data = $request->validate([
            'meal_frequency' => 'required|integer|min:0',
        ]);

        $user = $request->user();

        $user->meal_frequency = $data['meal_frequency'];
        $user->save();

        return response()->json([
            'success' => true,
            'message' => '家でご飯を食べる頻度を保存しました',
        ], 201);
    }

    public function edit(Request $request){
            $data = $request->validate([
                'meal_frequency' => 'required|integer|min:0',
        ]);
        $user = $request->user();

        $user->meal_frequency = $data['meal_frequency'];
        $user->save();

        return response()->json([
            'success' => true,
            'message' => '家でご飯を食べる頻度を更新しました',
        ]);
    }
}
