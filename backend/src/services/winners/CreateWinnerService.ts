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
