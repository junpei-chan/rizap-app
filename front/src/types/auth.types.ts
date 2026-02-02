import { z } from "zod";

export const authRequestSchema = z.object({
  email: z.string("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export type AuthRequest = z.infer<typeof authRequestSchema>;

export interface User {
  id: string;
  email: string;
  password: string;
  meaLfrequency: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}