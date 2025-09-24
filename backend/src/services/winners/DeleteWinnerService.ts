import { IWinnersRepository } from "../../repositories/winners/IWinnersRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface DeleteWinnerRequest {
  id: string
}

export class DeleteWinnerService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(data: DeleteWinnerRequest): Promise<void> {
    const existingWinner = await this.winnersRepository.findById(data.id)
    if (!existingWinner) {
      throw new NotFoundError("Ganhador não encontrado")
    }

    const result = await this.winnersRepository.delete(data.id)
    
    return result
  }
}
