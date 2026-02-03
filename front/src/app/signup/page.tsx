"use client";

import { useState } from "react";
import { useSignup } from "@/hooks/features/auth";
import { Input, Button, Checkbox, PasswordInput } from "@/components/ui";

export default function Signup() {
  const { mutate, isPending, isError, error } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    mutate({
      email,
      password,
    });
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-82">
        <h1 className="text-center text-2xl">
          サインアップ
        </h1>
        <form
          className="
            text-text mt-11
            label: text-[12px]
          "
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="pl-1"
              >
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                className="border h-10"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="pl-1"
              >
                パスワード
              </label>
              <PasswordInput
                id="password"
                className="border h-10"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3.5 items-center my-6">
            <div className="flex gap-4.5 text-[12px] justify-center">
              <p>利用規約</p>
              <p>プライバシーポリシー</p>
            </div>
            <div className="flex gap-1 items-center">
              <Checkbox 
                id="terms"
                className="data-[state=checked]:bg-[#108FFF] data-[state=checked]:border-[#108FFF]" 
              />
              <label 
                htmlFor="terms" 
                className="cursor-pointer"
              >
                上記に同意する
              </label>
            </div>
          </div>
          <Button
            type="button"
            className="w-full h-10 bg-[#108FFF] text-white shadow-[0_3px_0px_#0F5B9E]"
            onClick={handleSubmit}
          >
            登録
          </Button>
        </form>
        {isPending && (
          <p>処理中...</p>
        )}
        {isError && (
          <p>エラーが発生しました {error.message}</p>
        )}
      </div>
    </main>
  )
}