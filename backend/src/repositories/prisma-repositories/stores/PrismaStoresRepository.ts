import { PrismaClient } from "@prisma/client"
import { 
  IStoresRepository, 
  Store, 
  CreateStoreData, 
  UpdateStoreData, 
  GetStoresQuery, 
  GetStoresResult 
} from "../../stores/IStoresRepository"

export class PrismaStoresRepository implements IStoresRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateStoreData): Promise<Store> {
    const store = await this.prisma.store.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        state: data.state,
        city: data.city,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        deletedAt: null,
      },
    })

    const result: Store = {
      id: store.id,
      name: store.name,
      cnpj: store.cnpj,
      state: store.state,
      city: store.city,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,
    }

    return result
  }

  async findById(id: string): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!store) {
      return null
    }

    const result: Store = {
      id: store.id,
      name: store.name,
      cnpj: store.cnpj,
      state: store.state,
      city: store.city,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,
    }

    return result
  }

  async findMany(query: GetStoresQuery): Promise<GetStoresResult> {
    const { page, limit, state, city, name } = query
    const skip = (page - 1) * limit

    const where: any = {
      deletedAt: null,
    }

    if (state) {
      where.state = {
        contains: state,
        mode: 'insensitive',
      }
    }

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive',
      }
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    const [stores, total] = await Promise.all([
      this.prisma.store.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.store.count({ where }),
    ])

    const data: Store[] = stores.map(store => ({
      id: store.id,
      name: store.name,
      cnpj: store.cnpj,
      state: store.state,
      city: store.city,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,
    }))

    const totalPages = Math.ceil(total / limit)

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    }
  }

  async update(id: string, data: UpdateStoreData): Promise<Store | null> {
    const store = await this.prisma.store.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.cnpj && { cnpj: data.cnpj }),
        ...(data.state && { state: data.state }),
        ...(data.city && { city: data.city }),
        ...(data.address && { address: data.address }),
        ...(data.latitude !== undefined && { latitude: data.latitude }),
        ...(data.longitude !== undefined && { longitude: data.longitude }),
      },
    })

    const result: Store = {
      id: store.id,
      name: store.name,
      cnpj: store.cnpj,
      state: store.state,
      city: store.city,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,
    }

    return result
  }

  async delete(id: string): Promise<void> {
    await this.prisma.store.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async findByCnpj(cnpj: string): Promise<Store | null> {
    const store = await this.prisma.store.findFirst({
      where: {
        cnpj,
        deletedAt: null,
      },
    })

    if (!store) {
      return null
    }

    const result: Store = {
      id: store.id,
      name: store.name,
      cnpj: store.cnpj,
      state: store.state,
      city: store.city,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,
    }

    return result
  }
}
