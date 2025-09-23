import { IWinnersRepository } from "../../repositories/winners/IWinnersRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface DeleteWinnerRequest {
  id: string
}

export class DeleteWinnerService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(data: DeleteWinnerRequest): Promise<void> {
    if (!data.id || data.id.trim().length === 0) {
      throw new ValidationError("ID é obrigatório")
    }

    const objectIdPattern = /^[0-9a-fA-F]{24}$/
    if (!objectIdPattern.test(data.id)) {
      throw new ValidationError("ID deve ter formato válido")
    }

    const existingWinner = await this.winnersRepository.findById(data.id)
    if (!existingWinner) {
      throw new NotFoundError("Ganhador não encontrado")
    }

    const result = await this.winnersRepository.delete(data.id)
    
    return result
  }
}
