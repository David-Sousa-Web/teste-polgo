import { GetWinnersAggregationService } from "../../../../services/winners/GetWinnersAggregationService"
import { MockWinnersRepository } from "../../../helpers/MockWinnersRepository"

describe('GetWinnersAggregationService', () => {
  let getWinnersAggregationService: GetWinnersAggregationService
  let mockRepository: MockWinnersRepository

  beforeEach(() => {
    mockRepository = new MockWinnersRepository()
    getWinnersAggregationService = new GetWinnersAggregationService(mockRepository)
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
        state: "SP",
        city: "Campinas",
        prize: "R$ 2.000,00",
        drawDate: new Date('2024-01-20T10:00:00.000Z')
      },
      {
        fullName: "Pedro Oliveira",
        state: "RJ",
        city: "Rio de Janeiro",
        prize: "R$ 500,00",
        drawDate: new Date('2024-01-25T10:00:00.000Z')
      },
      {
        fullName: "Ana Costa",
        state: "RJ",
        city: "Niterói",
        prize: "R$ 1.500,00",
        drawDate: new Date('2024-01-30T10:00:00.000Z')
      },
      {
        fullName: "Carlos Lima",
        state: "MG",
        city: "Belo Horizonte",
        prize: "R$ 800,00",
        drawDate: new Date('2024-02-01T10:00:00.000Z')
      }
    ]

    it('should return empty aggregation when there are no winners', async () => {
      const result = await getWinnersAggregationService.execute()

      expect(result).toEqual([])
    })

    it('should count winners by state', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result).toHaveLength(3)
      expect(result).toEqual(
        expect.arrayContaining([
          { state: "SP", count: 2 },
          { state: "RJ", count: 2 },
          { state: "MG", count: 1 }
        ])
      )
    })

    it('should sort by descending count', async () => {
      mockRepository.seed(sampleWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result[0]).toEqual({ state: "SP", count: 2 })
      expect(result[1]).toEqual({ state: "RJ", count: 2 })
      expect(result[2]).toEqual({ state: "MG", count: 1 })
    })

    it('should work with a single state', async () => {
      const singleStateWinners = [
        sampleWinners[0],
        sampleWinners[1]
      ]
      
      mockRepository.seed(singleStateWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result).toEqual([
        { state: "SP", count: 2 }
      ])
    })

    it('should work with states that have only one winner', async () => {
      const uniqueStateWinners = [
        {
          fullName: "Winner 1",
          state: "AC",
          city: "Rio Branco",
          prize: "R$ 100,00",
          drawDate: new Date('2024-01-01T10:00:00.000Z')
        },
        {
          fullName: "Winner 2",
          state: "AM",
          city: "Manaus",
          prize: "R$ 200,00",
          drawDate: new Date('2024-01-02T10:00:00.000Z')
        },
        {
          fullName: "Winner 3",
          state: "AP",
          city: "Macapá",
          prize: "R$ 300,00",
          drawDate: new Date('2024-01-03T10:00:00.000Z')
        }
      ]
      
      mockRepository.seed(uniqueStateWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result).toHaveLength(3)
      expect(result).toEqual([
        { state: "AC", count: 1 },
        { state: "AM", count: 1 },
        { state: "AP", count: 1 }
      ])
    })

    it('should handle ties in sorting (stable order)', async () => {
      const tiedStatesWinners = [
        {
          fullName: "Winner 1",
          state: "BA",
          city: "Salvador",
          prize: "R$ 100,00",
          drawDate: new Date('2024-01-01T10:00:00.000Z')
        },
        {
          fullName: "Winner 2",
          state: "CE",
          city: "Fortaleza",
          prize: "R$ 200,00",
          drawDate: new Date('2024-01-02T10:00:00.000Z')
        }
      ]
      
      mockRepository.seed(tiedStatesWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result).toHaveLength(2)
      result.forEach(item => {
        expect(item.count).toBe(1)
      })
    })

    it('should call countByState on repository', async () => {
      const countByStateSpy = jest.spyOn(mockRepository, 'countByState')
      
      await getWinnersAggregationService.execute()

      expect(countByStateSpy).toHaveBeenCalledTimes(1)
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'countByState').mockRejectedValue(error)

      await expect(getWinnersAggregationService.execute())
        .rejects
        .toThrow('Database error')
    })

    it('should process data with repeated states correctly', async () => {
      const repeatedStatesWinners = [
        { ...sampleWinners[0], state: "SP" },
        { ...sampleWinners[1], state: "SP" },
        { ...sampleWinners[2], state: "RJ" },
        { ...sampleWinners[3], state: "SP" },
        { ...sampleWinners[4], state: "RJ" }
      ]
      
      mockRepository.seed(repeatedStatesWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result).toEqual([
        { state: "SP", count: 3 },
        { state: "RJ", count: 2 }
      ])
    })

    it('should maintain descending order even with high counts', async () => {
      const multipleWinners = Array(10).fill(null).map((_, index) => ({
        fullName: `Winner ${index}`,
        state: index < 7 ? "SP" : index < 9 ? "RJ" : "MG",
        city: "Test City",
        prize: "R$ 100,00",
        drawDate: new Date('2024-01-01T10:00:00.000Z')
      }))
      
      mockRepository.seed(multipleWinners)

      const result = await getWinnersAggregationService.execute()

      expect(result).toEqual([
        { state: "SP", count: 7 },
        { state: "RJ", count: 2 },
        { state: "MG", count: 1 }
      ])
    })
  })
})
