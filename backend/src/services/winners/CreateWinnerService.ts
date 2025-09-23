import { IWinnersRepository, Winner, CreateWinnerData } from "../../repositories/winners/IWinnersRepository"
import { ValidationError } from "../errors/ServiceError"

interface CreateWinnerRequest {
  fullName: string
  state: string
  city: string
  prize: string
  drawDate: Date
}

export class CreateWinnerService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(data: CreateWinnerRequest): Promise<Winner> {
    if (!data.fullName || data.fullName.trim().length < 2) {
      throw new ValidationError("Nome completo deve ter pelo menos 2 caracteres")
    }

    if (!data.state || data.state.trim().length !== 2) {
      throw new ValidationError("Estado deve ter exatamente 2 caracteres")
    }

    if (!data.city || data.city.trim().length < 2) {
      throw new ValidationError("Cidade deve ter pelo menos 2 caracteres")
    }

    if (!data.prize || data.prize.trim().length < 2) {
      throw new ValidationError("Prêmio deve ter pelo menos 2 caracteres")
    }

    if (!data.drawDate) {
      throw new ValidationError("Data do sorteio é obrigatória")
    }

    if (data.drawDate > new Date()) {
      throw new ValidationError("Data do sorteio não pode ser futura")
    }

    const createData: CreateWinnerData = {
      fullName: data.fullName.trim(),
      state: data.state.trim().toUpperCase(),
      city: data.city.trim(),
      prize: data.prize.trim(),
      drawDate: data.drawDate,
    }

    const result = await this.winnersRepository.create(createData)
    return result
  }
}
