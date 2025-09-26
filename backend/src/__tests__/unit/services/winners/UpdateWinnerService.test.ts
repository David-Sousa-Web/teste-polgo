import { UpdateWinnerService } from "../../../../services/winners/UpdateWinnerService"
import { MockWinnersRepository } from "../../../helpers/MockWinnersRepository"
import { NotFoundError, ValidationError } from "../../../../services/errors/ServiceError"

describe('UpdateWinnerService', () => {
  let updateWinnerService: UpdateWinnerService
  let mockRepository: MockWinnersRepository

  beforeEach(() => {
    mockRepository = new MockWinnersRepository()
    updateWinnerService = new UpdateWinnerService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleWinner = {
      fullName: "João Silva",
      state: "SP",
      city: "São Paulo",
      prize: "R$ 1.000,00",
      drawDate: new Date('2024-01-15T10:00:00.000Z')
    }

    it('should update an existing winner with all fields', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const updateData = {
        id: winnerId,
        fullName: "João Silva Santos",
        state: "RJ",
        city: "Rio de Janeiro",
        prize: "R$ 2.000,00",
        drawDate: new Date('2024-01-20T10:00:00.000Z')
      }

      const result = await updateWinnerService.execute(updateData)

      expect(result).toMatchObject({
        id: winnerId,
        fullName: "João Silva Santos",
        state: "RJ",
        city: "Rio de Janeiro",
        prize: "R$ 2.000,00",
        drawDate: updateData.drawDate
      })
    })

    it('should update only the full name', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await updateWinnerService.execute({
        id: winnerId,
        fullName: "João Silva Santos"
      })

      expect(result.fullName).toBe("João Silva Santos")
      expect(result.state).toBe("SP")
      expect(result.city).toBe("São Paulo")
      expect(result.prize).toBe("R$ 1.000,00")
    })

    it('should apply trim to fullName', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await updateWinnerService.execute({
        id: winnerId,
        fullName: "  João Silva Santos  "
      })

      expect(result.fullName).toBe("João Silva Santos")
    })

    it('should convert state to uppercase and apply trim', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await updateWinnerService.execute({
        id: winnerId,
        state: "  rj  "
      })

      expect(result.state).toBe("RJ")
    })

    it('should apply trim to city', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await updateWinnerService.execute({
        id: winnerId,
        city: "  Rio de Janeiro  "
      })

      expect(result.city).toBe("Rio de Janeiro")
    })

    it('should apply trim to prize', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await updateWinnerService.execute({
        id: winnerId,
        prize: "  R$ 2.000,00  "
      })

      expect(result.prize).toBe("R$ 2.000,00")
    })

    it('should throw NotFoundError for non-existent ID', async () => {
      const nonExistentId = "123456789012345678901234"

      await expect(updateWinnerService.execute({
        id: nonExistentId,
        fullName: "Novo Nome"
      }))
        .rejects
        .toThrow(NotFoundError)

      await expect(updateWinnerService.execute({
        id: nonExistentId,
        fullName: "Novo Nome"
      }))
        .rejects
        .toThrow("Ganhador não encontrado")
    })

    it('should reject future dates', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)

      await expect(updateWinnerService.execute({
        id: winnerId,
        drawDate: futureDate
      }))
        .rejects
        .toThrow(ValidationError)

      await expect(updateWinnerService.execute({
        id: winnerId,
        drawDate: futureDate
      }))
        .rejects
        .toThrow("Data do sorteio não pode ser futura")
    })

    it('should accept present date', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const now = new Date()

      const result = await updateWinnerService.execute({
        id: winnerId,
        drawDate: now
      })

      expect(result.drawDate).toEqual(now)
    })

    it('should accept past date', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const pastDate = new Date('2023-12-01T10:00:00.000Z')

      const result = await updateWinnerService.execute({
        id: winnerId,
        drawDate: pastDate
      })

      expect(result.drawDate).toEqual(pastDate)
    })

    it('should keep unspecified fields unchanged', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id
      const originalWinner = winners[0]

      const result = await updateWinnerService.execute({
        id: winnerId,
        fullName: "Novo Nome"
      })

      expect(result.fullName).toBe("Novo Nome")
      expect(result.state).toBe(originalWinner.state)
      expect(result.city).toBe(originalWinner.city)
      expect(result.prize).toBe(originalWinner.prize)
      expect(result.drawDate).toEqual(originalWinner.drawDate)
    })

    it('should call findById to verify existence', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const findByIdSpy = jest.spyOn(mockRepository, 'findById')

      await updateWinnerService.execute({
        id: winnerId,
        fullName: "Novo Nome"
      })

      expect(findByIdSpy).toHaveBeenCalledWith(winnerId)
    })

    it('should call update with correct data', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const updateSpy = jest.spyOn(mockRepository, 'update')

      await updateWinnerService.execute({
        id: winnerId,
        fullName: "Novo Nome",
        state: "RJ"
      })

      expect(updateSpy).toHaveBeenCalledWith(winnerId, {
        fullName: "Novo Nome",
        state: "RJ"
      })
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'findById').mockRejectedValue(error)

      await expect(updateWinnerService.execute({
        id: "123456789012345678901234",
        fullName: "Novo Nome"
      }))
        .rejects
        .toThrow('Database error')
    })

    it('should handle undefined fields correctly', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const updateSpy = jest.spyOn(mockRepository, 'update')

      await updateWinnerService.execute({
        id: winnerId,
        fullName: undefined,
        state: "RJ",
        city: undefined,
        prize: "R$ 2.000,00",
        drawDate: undefined
      })

      expect(updateSpy).toHaveBeenCalledWith(winnerId, {
        state: "RJ",
        prize: "R$ 2.000,00"
      })
    })
  })
})
