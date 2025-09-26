import { GetWinnersService } from "../../../../services/winners/GetWinnersService"
import { MockWinnersRepository } from "../../../helpers/MockWinnersRepository"

describe('GetWinnersService', () => {
  let getWinnersService: GetWinnersService
  let mockRepository: MockWinnersRepository

  beforeEach(() => {
    mockRepository = new MockWinnersRepository()
    getWinnersService = new GetWinnersService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleWinners = [
      {
        fullName: "João Silva",
        state: "SP",
        city: "São Paulo",
        prize: "R$ 1.000,00",
        drawDate: new Date('2024-01-15T10:00:00.000Z')
      },
      {
        fullName: "Maria Santos",
        state: "RJ",
        city: "Rio de Janeiro",
        prize: "R$ 2.000,00",
        drawDate: new Date('2024-01-20T10:00:00.000Z')
      },
      {
        fullName: "Pedro Oliveira",
        state: "SP",
        city: "Campinas",
        prize: "R$ 500,00",
        drawDate: new Date('2024-01-25T10:00:00.000Z')
      }
    ]

    it('should return all winners without filters', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({})

      expect(result.data).toHaveLength(3)
      expect(result.total).toBe(3)
      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
      expect(result.totalPages).toBe(1)
    })

    it('should use default pagination values', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({})

      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
    })

    it('should apply pagination correctly', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({
        page: 2,
        limit: 2
      })

      expect(result.data).toHaveLength(1)
      expect(result.page).toBe(2)
      expect(result.limit).toBe(2)
      expect(result.total).toBe(3)
      expect(result.totalPages).toBe(2)
    })

    it('should use page 1 for invalid page values', async () => {
      mockRepository.seed(sampleWinners)

      const result1 = await getWinnersService.execute({ page: 0 })
      const result2 = await getWinnersService.execute({ page: -1 })

      expect(result1.page).toBe(1)
      expect(result2.page).toBe(1)
    })

    it('should use limit 10 for invalid limit values', async () => {
      mockRepository.seed(sampleWinners)

      const result1 = await getWinnersService.execute({ limit: 0 })
      const result2 = await getWinnersService.execute({ limit: -1 })
      const result3 = await getWinnersService.execute({ limit: 150 })

      expect(result1.limit).toBe(10)
      expect(result2.limit).toBe(10)
      expect(result3.limit).toBe(10)
    })

    it('should accept maximum limit of 100', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({ limit: 100 })

      expect(result.limit).toBe(100)
    })

    it('should filter by state', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({ state: "SP" })

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
      result.data.forEach(winner => {
        expect(winner.state).toBe("SP")
      })
    })

    it('should filter by city', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({ city: "São Paulo" })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].city).toBe("São Paulo")
    })

    it('should filter by prize', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({ prize: "1.000" })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].prize).toBe("R$ 1.000,00")
    })

    it('should filter by full name', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({ fullName: "João" })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].fullName).toBe("João Silva")
    })

    it('should combine multiple filters', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({
        state: "SP",
        city: "São Paulo"
      })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].state).toBe("SP")
      expect(result.data[0].city).toBe("São Paulo")
    })

    it('should ignore filters with empty strings', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({
        state: "",
        city: "   ",
        prize: "",
        fullName: "  "
      })

      expect(result.data).toHaveLength(3)
      expect(result.total).toBe(3)
    })

    it('should apply trim to filters', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({
        state: "  SP  ",
        city: "  São Paulo  "
      })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].state).toBe("SP")
      expect(result.data[0].city).toBe("São Paulo")
    })

    it('should return empty result when no winners are found', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersService.execute({ state: "XX" })

      expect(result.data).toHaveLength(0)
      expect(result.total).toBe(0)
      expect(result.totalPages).toBe(0)
    })

    it('should call repository with correct filters and pagination', async () => {
      const findManySpy = jest.spyOn(mockRepository, 'findMany')

      await getWinnersService.execute({
        page: 2,
        limit: 5,
        state: "SP",
        city: "São Paulo"
      })

      expect(findManySpy).toHaveBeenCalledWith(
        {
          state: "SP",
          city: "São Paulo"
        },
        {
          page: 2,
          limit: 5
        }
      )
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'findMany').mockRejectedValue(error)

      await expect(getWinnersService.execute({}))
        .rejects
        .toThrow('Database error')
    })
  })
})
