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

    const updateData: UpdateWinnerData = {}

    if (data.fullName !== undefined) {
      if (!data.fullName || data.fullName.trim().length < 2) {
        throw new ValidationError("Nome completo deve ter pelo menos 2 caracteres")
      }
      updateData.fullName = data.fullName.trim()
    }

    if (data.state !== undefined) {
      if (!data.state || data.state.trim().length !== 2) {
        throw new ValidationError("Estado deve ter exatamente 2 caracteres")
      }
      updateData.state = data.state.trim().toUpperCase()
    }

    if (data.city !== undefined) {
      if (!data.city || data.city.trim().length < 2) {
        throw new ValidationError("Cidade deve ter pelo menos 2 caracteres")
      }
      updateData.city = data.city.trim()
    }

    if (data.prize !== undefined) {
      if (!data.prize || data.prize.trim().length < 2) {
        throw new ValidationError("Prêmio deve ter pelo menos 2 caracteres")
      }
      updateData.prize = data.prize.trim()
    }

    if (data.drawDate !== undefined) {
      if (!data.drawDate) {
        throw new ValidationError("Data do sorteio é obrigatória")
      }
      
      if (data.drawDate > new Date()) {
        throw new ValidationError("Data do sorteio não pode ser futura")
      }
      updateData.drawDate = data.drawDate
    }

    if (Object.keys(updateData).length === 0) {
      throw new ValidationError("Pelo menos um campo deve ser informado para atualização")
    }

    const result = await this.winnersRepository.update(data.id, updateData)
    
    return result
  }
}
