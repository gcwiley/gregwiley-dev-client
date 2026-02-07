// define a standard wrapper for your backend response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// define the paginated response type
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
