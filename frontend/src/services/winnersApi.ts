import api from './api'
import type { PaginationParams, PaginatedResponse, ApiResponse } from '@/types/api'

export interface Winner {
  id: string
  fullName: string
  state: string
  city: string
  prize: string
  drawDate: string
}

export interface StateAggregation {
  state: string
  count: number
}

export interface WinnersFilters {
  state?: string
  city?: string
  prize?: string
  fullName?: string
}

export const winnersApi = {
  async getWinners(
    filters?: WinnersFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Winner>> {
    const params = new URLSearchParams()

    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (filters?.state) params.append('state', filters.state)
    if (filters?.city) params.append('city', filters.city)
    if (filters?.prize) params.append('prize', filters.prize)
    if (filters?.fullName) params.append('fullName', filters.fullName)

    const response = await api.get<ApiResponse<Winner>>(`/ganhadores?${params.toString()}`)
    
    return {
      data: response.data.data,
      total: response.data.pagination?.total || 0,
      page: response.data.pagination?.page || 1,
      limit: response.data.pagination?.limit || 10,
      totalPages: response.data.pagination?.totalPages || 0,
    }
  },

  async getStateAggregation(): Promise<{ data: StateAggregation[] }> {
    const response = await api.get<{ data: StateAggregation[] }>('/ganhadores/agregacao')
    return response.data
  },
}
