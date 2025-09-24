import { IWinnersRepository, Winner, UpdateWinnerData } from "../../repositories/winners/IWinnersRepository"
import { NotFoundError, ValidationError } from "../errors/ServiceError"

interface UpdateWinnerRequest {
  id: string
  fullName?: string
  state?: string
  city?: string
  prize?: string
  drawDate?: Date
}

export class UpdateWinnerService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(data: UpdateWinnerRequest): Promise<Winner> {
    const existingWinner = await this.winnersRepository.findById(data.id)
    if (!existingWinner) {
      throw new NotFoundError("Ganhador não encontrado")
    }

    const updateData: UpdateWinnerData = {}

    if (data.fullName !== undefined) {
      updateData.fullName = data.fullName.trim()
    }

    if (data.state !== undefined) {
      updateData.state = data.state.trim().toUpperCase()
    }

    if (data.city !== undefined) {
      updateData.city = data.city.trim()
    }

    if (data.prize !== undefined) {
      updateData.prize = data.prize.trim()
    }

    if (data.drawDate !== undefined) {
      if (data.drawDate > new Date()) {
        throw new ValidationError("Data do sorteio não pode ser futura")
      }
      updateData.drawDate = data.drawDate
    }

    const result = await this.winnersRepository.update(data.id, updateData)
    
    return result
  }
}
