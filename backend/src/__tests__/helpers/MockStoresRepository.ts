import { 
  IStoresRepository, 
  Store, 
  CreateStoreData, 
  UpdateStoreData, 
  GetStoresQuery, 
  GetStoresResult 
} from "../../repositories/stores/IStoresRepository"

export class MockStoresRepository implements IStoresRepository {
  private stores: Store[] = []
  private currentId = 1

  private generateId(): string {
    return (this.currentId++).toString().padStart(24, '0')
  }

  async create(data: CreateStoreData): Promise<Store> {
    const store: Store = {
      id: this.generateId(),
      ...data
    }
    this.stores.push(store)
    return store
  }

  async findById(id: string): Promise<Store | null> {
    return this.stores.find(store => store.id === id) || null
  }

  async findMany(query: GetStoresQuery): Promise<GetStoresResult> {
    let filteredStores = [...this.stores]

    if (query.state) {
      filteredStores = filteredStores.filter(store => 
        store.state.toLowerCase().includes(query.state!.toLowerCase())
      )
    }

    if (query.city) {
      filteredStores = filteredStores.filter(store => 
        store.city.toLowerCase().includes(query.city!.toLowerCase())
      )
    }

    if (query.name) {
      filteredStores = filteredStores.filter(store => 
        store.name.toLowerCase().includes(query.name!.toLowerCase())
      )
    }

    const page = query.page || 1
    const limit = query.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedStores = filteredStores.slice(startIndex, endIndex)
    const total = filteredStores.length
    const totalPages = Math.ceil(total / limit)

    return {
      data: paginatedStores,
      total,
      page,
      limit,
      totalPages
    }
  }

  async update(id: string, data: UpdateStoreData): Promise<Store | null> {
    const storeIndex = this.stores.findIndex(store => store.id === id)
    if (storeIndex === -1) {
      return null
    }

    const updatedStore = {
      ...this.stores[storeIndex],
      ...data
    }

    this.stores[storeIndex] = updatedStore
    return updatedStore
  }

  async delete(id: string): Promise<void> {
    const storeIndex = this.stores.findIndex(store => store.id === id)
    if (storeIndex === -1) {
      throw new Error('Store not found')
    }

    this.stores.splice(storeIndex, 1)
  }

  async findByCnpj(cnpj: string): Promise<Store | null> {
    return this.stores.find(store => store.cnpj === cnpj) || null
  }

  clear(): void {
    this.stores = []
    this.currentId = 1
  }

  seed(stores: Omit<Store, 'id'>[]): void {
    this.clear()
    stores.forEach(store => {
      this.stores.push({
        ...store,
        id: this.generateId()
      })
    })
  }

  getAll(): Store[] {
    return [...this.stores]
  }
}
