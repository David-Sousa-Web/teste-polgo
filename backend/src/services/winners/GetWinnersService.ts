import { IWinnersRepository, WinnersFilters, PaginationParams, PaginatedResult, Winner } from "../../repositories/winners/IWinnersRepository"
import { ValidationError } from "../errors/ServiceError"

interface GetWinnersRequest {
  page?: number
  limit?: number
  state?: string
  city?: string
  prize?: string
  fullName?: string
}

export class GetWinnersService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(params: GetWinnersRequest): Promise<PaginatedResult<Winner>> {
    const page = params.page && params.page > 0 ? params.page : 1
    const limit = params.limit && params.limit > 0 && params.limit <= 100 ? params.limit : 10

    if (params.limit && params.limit > 100) {
      throw new ValidationError("Limite máximo de registros por página é 100")
    }
    
    const filters: WinnersFilters = {}
    
    if (params.state && params.state.trim()) {
      filters.state = params.state.trim()
    }

    if (params.city && params.city.trim()) {
      filters.city = params.city.trim()
    }

    if (params.prize && params.prize.trim()) {
      filters.prize = params.prize.trim()
    }

    if (params.fullName && params.fullName.trim()) {
      filters.fullName = params.fullName.trim()
    }

    const pagination: PaginationParams = { page, limit }

    const result = await this.winnersRepository.findMany(filters, pagination)
    
    return result
  }
}
