import api from './api'
import type { PaginationParams, PaginatedResponse, ApiResponse } from '@/types/api'

export interface Store {
  id: string
  name: string
  cnpj: string
  state: string
  city: string
  address: string
  latitude?: number | null
  longitude?: number | null
}

export interface StoresFilters {
  state?: string
  city?: string
  name?: string
}

export const storesApi = {
  async getStores(
    filters?: StoresFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Store>> {
    const params = new URLSearchParams()

    if (pagination?.page) params.append('page', String(pagination.page))
    if (pagination?.limit) params.append('limit', String(pagination.limit))
    if (filters?.state) params.append('state', filters.state)
    if (filters?.city) params.append('city', filters.city)
    if (filters?.name) params.append('name', filters.name)

    const response = await api.get<ApiResponse<Store>>(`/lojas?${params.toString()}`)
    
    return {
      data: response.data.data,
      total: response.data.pagination?.total || 0,
      page: response.data.pagination?.page || 1,
      limit: response.data.pagination?.limit || 10,
      totalPages: response.data.pagination?.totalPages || 0,
    }
  },

  async getStoreById(id: string): Promise<Store | null> {
    const response = await api.get<ApiResponse<Store>>(`/lojas/${id}`)
    return response.data.data[0] || null
  },
}
