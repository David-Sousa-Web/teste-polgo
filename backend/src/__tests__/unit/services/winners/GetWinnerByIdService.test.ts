import { GetWinnerByIdService } from "../../../../services/winners/GetWinnerByIdService"
import { MockWinnersRepository } from "../../../helpers/MockWinnersRepository"
import { NotFoundError } from "../../../../services/errors/ServiceError"
import { Winner } from "../../../../repositories/winners/IWinnersRepository"

describe('GetWinnerByIdService', () => {
  let getWinnerByIdService: GetWinnerByIdService
  let mockRepository: MockWinnersRepository

  beforeEach(() => {
    mockRepository = new MockWinnersRepository()
    getWinnerByIdService = new GetWinnerByIdService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleWinner = {
      fullName: "Maria Silva",
      state: "RJ",
      city: "Rio de Janeiro",
      prize: "R$ 2.000,00",
      drawDate: new Date('2024-01-15T10:00:00.000Z')
    }

    it('should return an existing winner', async () => {
      mockRepository.seed([sampleWinner])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await getWinnerByIdService.execute({ id: winnerId })

      expect(result).toEqual(winners[0])
    })

    it('should throw NotFoundError for non-existent ID', async () => {
      const nonExistentId = "123456789012345678901234"

      await expect(getWinnerByIdService.execute({ id: nonExistentId }))
        .rejects
        .toThrow(NotFoundError)

      await expect(getWinnerByIdService.execute({ id: nonExistentId }))
        .rejects
        .toThrow("Ganhador não encontrado")
    })

    it('should call repository with correct ID', async () => {
      const findByIdSpy = jest.spyOn(mockRepository, 'findById')
      const testId = "123456789012345678901234"

      findByIdSpy.mockResolvedValue(null)

      try {
        await getWinnerByIdService.execute({ id: testId })
      } catch (error) {
      }

      expect(findByIdSpy).toHaveBeenCalledWith(testId)
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'findById').mockRejectedValue(error)

      await expect(getWinnerByIdService.execute({ id: "123456789012345678901234" }))
        .rejects
        .toThrow('Database error')
    })

    it('should work with different valid ID formats', async () => {
      const winner1 = { ...sampleWinner, fullName: "João" }
      const winner2 = { ...sampleWinner, fullName: "Pedro" }
      
      mockRepository.seed([winner1, winner2])
      const winners = mockRepository.getAll()

      const result1 = await getWinnerByIdService.execute({ id: winners[0].id })
      const result2 = await getWinnerByIdService.execute({ id: winners[1].id })

      expect(result1.fullName).toBe("João")
      expect(result2.fullName).toBe("Pedro")
    })
  })
})
