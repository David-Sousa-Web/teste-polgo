import { IStoresRepository } from "../../repositories/stores/IStoresRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface DeleteStoreRequest {
  id: string
}

export class DeleteStoreService {
  constructor(private storesRepository: IStoresRepository) {}

  async execute(data: DeleteStoreRequest): Promise<void> {
    const { id } = data

    const existingStore = await this.storesRepository.findById(id)
    if (!existingStore) {
      throw new NotFoundError("Loja não encontrada")
    }

    const result = await this.storesRepository.delete(id)
    return result
  }
}
