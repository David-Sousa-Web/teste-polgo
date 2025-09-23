export interface Winner {
  id: string
  fullName: string
  state: string
  city: string
  prize: string
  drawDate: Date
}

export interface CreateWinnerData {
  fullName: string
  state: string
  city: string
  prize: string
  drawDate: Date
}

export interface UpdateWinnerData {
  fullName?: string
  state?: string
  city?: string
  prize?: string
  drawDate?: Date
}

export interface WinnersFilters {
  state?: string
  city?: string
  prize?: string
  fullName?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface IWinnersRepository {
  create(data: CreateWinnerData): Promise<Winner>
  findById(id: string): Promise<Winner | null>
  findMany(
    filters?: WinnersFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Winner>>
  update(id: string, data: UpdateWinnerData): Promise<Winner>
  delete(id: string): Promise<void>
  countByState(): Promise<Array<{ state: string; count: number }>>
}
