export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
    statuscode?: number;
  }