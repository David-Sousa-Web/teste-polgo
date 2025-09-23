export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  pagination?: PaginationInfo
  message: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: string[]
}
