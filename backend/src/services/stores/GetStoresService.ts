import { IStoresRepository, GetStoresResult } from "../../repositories/stores/IStoresRepository"

interface GetStoresRequest {
  page?: number
  limit?: number
  state?: string
  city?: string
  name?: string
}

export class GetStoresService {
  constructor(private storesRepository: IStoresRepository) {}

  async execute(data: GetStoresRequest): Promise<GetStoresResult> {
    const page = data.page || 1
    const limit = Math.min(data.limit || 10, 100)

    const query = {
      page,
      limit,
      state: data.state?.trim(),
      city: data.city?.trim(),
      name: data.name?.trim(),
    }

    const result = await this.storesRepository.findMany(query)
    return result
  }
}
