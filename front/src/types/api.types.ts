export interface ApiResponse<T = undefined> {
  data?: T;
  success: boolean;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}