export interface PaginationResponse<T> {
  data: T[];
  next: string | null;
  previous: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
