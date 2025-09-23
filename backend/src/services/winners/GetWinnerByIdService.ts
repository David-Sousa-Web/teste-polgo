import { IWinnersRepository, Winner } from "../../repositories/winners/IWinnersRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface GetWinnerByIdRequest {
  id: string
}

export class GetWinnerByIdService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(data: GetWinnerByIdRequest): Promise<Winner> {
    if (!data.id || data.id.trim().length === 0) {
      throw new ValidationError("ID é obrigatório")
    }

    const objectIdPattern = /^[0-9a-fA-F]{24}$/
    if (!objectIdPattern.test(data.id)) {
      throw new ValidationError("ID deve ter formato válido")
    }

    const winner = await this.winnersRepository.findById(data.id)

    if (!winner) {
      throw new NotFoundError("Ganhador não encontrado")
    }
    
    return winner
  }
}
