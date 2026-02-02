export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}