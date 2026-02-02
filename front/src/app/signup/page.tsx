"use client";

import { useState } from "react";
import { useSignup } from "@/hooks/features/auth";

export default function Signup() {
  const { mutate, isPending, isError, error } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    mutate({
      email: email,
      password: password,
    });
  };

  return (
    <main>
      <h1>新規会員登録</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label 
            htmlFor="email"
          >
            メールアドレス
          </label>
          <input 
            id="email"
            type="email"
            className="border"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label 
            htmlFor="password"
          >
            パスワード
          </label>
          <input 
            id="password"
            type="password"
            className="border"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white"
          onClick={handleSubmit}
        >
          登録
        </button>
      </form>

      {isPending && (
        <p>処理中...</p>
      )}

      {isError && (
        <p>エラーが発生しました {error.message}</p>
      )}
    </main>
  )
}