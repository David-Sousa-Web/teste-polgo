import { IStoresRepository, Store } from "../../repositories/stores/IStoresRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface GetStoreByIdRequest {
  id: string
}

export class GetStoreByIdService {
  constructor(private storesRepository: IStoresRepository) {}

  async execute(data: GetStoreByIdRequest): Promise<Store> {
    const { id } = data

    const result = await this.storesRepository.findById(id)
    
    if (!result) {
      throw new NotFoundError("Loja não encontrada")
    }

    return result
  }
}
