import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth-service";
import type { AuthRequest } from "@/types/auth.types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.login(credentials),
  });
};