import { 
  IWinnersRepository, 
  Winner, 
  CreateWinnerData, 
  UpdateWinnerData, 
  WinnersFilters, 
  PaginationParams, 
  PaginatedResult 
} from "../../repositories/winners/IWinnersRepository"

export class MockWinnersRepository implements IWinnersRepository {
  private winners: Winner[] = []
  private currentId = 1

  private generateId(): string {
    return (this.currentId++).toString().padStart(24, '0')
  }

  async create(data: CreateWinnerData): Promise<Winner> {
    const winner: Winner = {
      id: this.generateId(),
      ...data
    }
    this.winners.push(winner)
    return winner
  }

  async findById(id: string): Promise<Winner | null> {
    return this.winners.find(winner => winner.id === id) || null
  }

  async findMany(
    filters?: WinnersFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Winner>> {
    let filteredWinners = [...this.winners]

    if (filters?.state) {
      filteredWinners = filteredWinners.filter(winner => 
        winner.state.toLowerCase().includes(filters.state!.toLowerCase())
      )
    }

    if (filters?.city) {
      filteredWinners = filteredWinners.filter(winner => 
        winner.city.toLowerCase().includes(filters.city!.toLowerCase())
      )
    }

    if (filters?.prize) {
      filteredWinners = filteredWinners.filter(winner => 
        winner.prize.toLowerCase().includes(filters.prize!.toLowerCase())
      )
    }

    if (filters?.fullName) {
      filteredWinners = filteredWinners.filter(winner => 
        winner.fullName.toLowerCase().includes(filters.fullName!.toLowerCase())
      )
    }

    const page = pagination?.page || 1
    const limit = pagination?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedWinners = filteredWinners.slice(startIndex, endIndex)
    const total = filteredWinners.length
    const totalPages = Math.ceil(total / limit)

    return {
      data: paginatedWinners,
      total,
      page,
      limit,
      totalPages
    }
  }

  async update(id: string, data: UpdateWinnerData): Promise<Winner> {
    const winnerIndex = this.winners.findIndex(winner => winner.id === id)
    if (winnerIndex === -1) {
      throw new Error('Winner not found')
    }

    const updatedWinner = {
      ...this.winners[winnerIndex],
      ...data
    }

    this.winners[winnerIndex] = updatedWinner
    return updatedWinner
  }

  async delete(id: string): Promise<void> {
    const winnerIndex = this.winners.findIndex(winner => winner.id === id)
    if (winnerIndex === -1) {
      throw new Error('Winner not found')
    }

    this.winners.splice(winnerIndex, 1)
  }

  async countByState(): Promise<Array<{ state: string; count: number }>> {
    const stateCount: { [key: string]: number } = {}
    
    this.winners.forEach(winner => {
      stateCount[winner.state] = (stateCount[winner.state] || 0) + 1
    })

    return Object.entries(stateCount).map(([state, count]) => ({ state, count }))
  }

  clear(): void {
    this.winners = []
    this.currentId = 1
  }

  seed(winners: Omit<Winner, 'id'>[]): void {
    this.clear()
    winners.forEach(winner => {
      this.winners.push({
        ...winner,
        id: this.generateId()
      })
    })
  }

  getAll(): Winner[] {
    return [...this.winners]
  }
}
