<?php

namespace App\Http\Controllers;
use App\Models\User; // Userモデルを使用
use Illuminate\Support\Facades\Hash; // ハッシュパスワードのチェックに使用
use Illuminate\Support\Facades\Auth; // ログイン処理
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException; // バリデーション例外

class AuthController extends Controller
{
    public function login(Request $request){

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        // emailで絞り込み
        $user = User::where('email', $email)->first();

        // ユーザーが存在しない場合 or パスワードが一致しない場合にエラーを返す
        // Hash::check()でパスワードのチェックを行える
        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => "ログインできませんでした。"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'ログイン成功',
            'token' => $user->createToken('access_token')->plainTextToken
        ]);
    }

    public function sign_up(Request $request){
        try {
            $validated = $request->validate([
                'email' => 'required|email|max:255|unique:users,email',//required -> 入力必須　：　email -> メール型か : max:255 -> 255文字以内 : unique:users,email -> 同じ名前はだめ
                'password' => 'required|string|min:8' //confirmed -> パスワード再入力と値が同じかどうか
            ]);

            $user = User::create([
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            return response()->json([
                'success' => true,
                'message' => '登録に成功しました',
                'token' => $user->createToken('access_token')->plainTextToken
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'バリデーションエラー',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '登録に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
