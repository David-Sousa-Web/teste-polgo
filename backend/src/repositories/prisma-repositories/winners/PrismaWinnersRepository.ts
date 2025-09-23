import { PrismaClient } from "@prisma/client"
import { 
  IWinnersRepository, 
  Winner, 
  CreateWinnerData, 
  UpdateWinnerData,
  WinnersFilters,
  PaginationParams,
  PaginatedResult
} from "../../winners/IWinnersRepository"

export class PrismaWinnersRepository implements IWinnersRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateWinnerData): Promise<Winner> {
    const winner = await this.prisma.winner.create({
      data: {
        fullName: data.fullName,
        state: data.state,
        city: data.city,
        prize: data.prize,
        drawDate: data.drawDate,
      },
    })

    const result: Winner = {
      id: winner.id,
      fullName: winner.fullName,
      state: winner.state,
      city: winner.city,
      prize: winner.prize,
      drawDate: winner.drawDate,
    }

    return result
  }

  async findById(id: string): Promise<Winner | null> {
    const winner = await this.prisma.winner.findUnique({
      where: { 
        id,
        deletedAt: null 
      },
    })

    if (!winner) {
      return null
    }

    const result: Winner = {
      id: winner.id,
      fullName: winner.fullName,
      state: winner.state,
      city: winner.city,
      prize: winner.prize,
      drawDate: winner.drawDate,
    }

    return result
  }

  async findMany(
    filters?: WinnersFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Winner>> {
    const where = {
      deletedAt: null,
      ...(filters?.state && { state: { contains: filters.state, mode: 'insensitive' as const } }),
      ...(filters?.city && { city: { contains: filters.city, mode: 'insensitive' as const } }),
      ...(filters?.prize && { prize: { contains: filters.prize, mode: 'insensitive' as const } }),
      ...(filters?.fullName && { fullName: { contains: filters.fullName, mode: 'insensitive' as const } }),
    }

    const page = pagination?.page || 1
    const limit = pagination?.limit || 10
    const skip = (page - 1) * limit

    const [winners, total] = await Promise.all([
      this.prisma.winner.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.winner.count({ where }),
    ])

    const mappedWinners: Winner[] = winners.map(winner => ({
      id: winner.id,
      fullName: winner.fullName,
      state: winner.state,
      city: winner.city,
      prize: winner.prize,
      drawDate: winner.drawDate,
    }))

    const result: PaginatedResult<Winner> = {
      data: mappedWinners,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }

    return result
  }

  async update(id: string, data: UpdateWinnerData): Promise<Winner> {
    const winner = await this.prisma.winner.update({
      where: { 
        id,
        deletedAt: null 
      },
      data,
    })

    const result: Winner = {
      id: winner.id,
      fullName: winner.fullName,
      state: winner.state,
      city: winner.city,
      prize: winner.prize,
      drawDate: winner.drawDate,
    }

    return result
  }

  async delete(id: string): Promise<void> {
    await this.prisma.winner.update({
      where: { 
        id,
        deletedAt: null 
      },
      data: {
        deletedAt: new Date(),
      },
    })
    
    return
  }

  async countByState(): Promise<Array<{ state: string; count: number }>> {
    const groupByResult = await this.prisma.winner.groupBy({
      by: ['state'],
      where: { deletedAt: null },
      _count: {
        state: true,
      },
    })

    const result = groupByResult.map(item => ({
      state: item.state,
      count: item._count.state,
    }))

    return result
  }
}
