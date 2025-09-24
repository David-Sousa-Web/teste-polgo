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

export interface CreateStoreData {
  name: string
  cnpj: string
  state: string
  city: string
  address: string
  latitude?: number | null
  longitude?: number | null
}

export interface UpdateStoreData {
  name?: string
  cnpj?: string
  state?: string
  city?: string
  address?: string
  latitude?: number | null
  longitude?: number | null
}

export interface GetStoresFilters {
  state?: string
  city?: string
  name?: string
}

export interface GetStoresQuery extends GetStoresFilters {
  page: number
  limit: number
}

export interface GetStoresResult {
  data: Store[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface IStoresRepository {
  create(data: CreateStoreData): Promise<Store>
  findById(id: string): Promise<Store | null>
  findMany(query: GetStoresQuery): Promise<GetStoresResult>
  update(id: string, data: UpdateStoreData): Promise<Store | null>
  delete(id: string): Promise<void>
  countByState(): Promise<Array<{ state: string; count: number }>>
  findByCnpj(cnpj: string): Promise<Store | null>
}
