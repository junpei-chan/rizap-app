"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/features/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components/ui";

export default function Login() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    mutate({
      email,
      password,
    });
  };

  return (
    <main>
      <div className="text-center text-2xl mt-44 mb-12">
        {/* <Image 
          src="/logo.png"
          alt="logo"
          width={72}
          height={72}
        /> */}
        <h1>
          ようこそ
        </h1>
      </div>
      <form
        className="
          w-82 mx-auto text-text 
          label: text-[12px]
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4.5 mb-5">
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
              className="w-full h-10 text-sm bg-[#FAFAFA] rounded-sm border-[#CCCCCC]"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="pl-1"
            >
              パスワード
            </label>
            <Input
              id="password"
              type="email"
              className="w-full h-10 text-sm bg-[#FAFAFA] rounded-sm border-[#CCCCCC]"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="button"
          className="w-full h-10 rounded-sm bg-[#FF754F] text-white shadow-[0_3px_0px_#CE5E3F] mb-4"
          onClick={handleSubmit}
        >
          ログイン
        </Button>
        <Link
          href="#"
          className="inline-block w-full text-[12px] text-text text-center"
        >
          パスワードをお忘れですか？
        </Link>
        <p
          className="
            flex items-center gap-2 my-9
            before:content-[''] before:block before:w-34 before:h-px before:bg-[#CBCBCB]
            after:content-[''] after:block after:w-34 after:h-px after:bg-[#CBCBCB]
          "
        >
          または
        </p>
        <Button 
          type="button"
          className="w-full h-10 rounded-sm bg-white border border-[#108FFF] text-[#108FFF] mb-35"
          onClick={() => router.push("/signup")}
        >
          新規登録
        </Button>
        <div className="flex gap-4.5 text-[12px] justify-center mb-6">
          <p>利用規約</p>
          <p>プライバシーポリシー</p>
        </div>
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