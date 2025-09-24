import { IWinnersRepository, Winner } from "../../repositories/winners/IWinnersRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface GetWinnerByIdRequest {
  id: string
}

export class GetWinnerByIdService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(data: GetWinnerByIdRequest): Promise<Winner> {
    const winner = await this.winnersRepository.findById(data.id)

    if (!winner) {
      throw new NotFoundError("Ganhador não encontrado")
    }
    
    return winner
  }
}
