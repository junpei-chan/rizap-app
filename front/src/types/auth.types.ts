import { z } from "zod";

export const authRequestSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export type AuthRequest = z.infer<typeof authRequestSchema>;

export interface User {
  id: string;
  email: string;
  mealFrequency: number;
}

export interface AuthResponse {
  token: string;
  success: boolean;
  message: string;
  user?: User;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}