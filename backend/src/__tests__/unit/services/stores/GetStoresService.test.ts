import { GetStoresService } from "../../../../services/stores/GetStoresService"
import { MockStoresRepository } from "../../../helpers/MockStoresRepository"

describe('GetStoresService', () => {
  let getStoresService: GetStoresService
  let mockRepository: MockStoresRepository

  beforeEach(() => {
    mockRepository = new MockStoresRepository()
    getStoresService = new GetStoresService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleStores = [
      {
        name: "Loja SP",
        cnpj: "11222333000181",
        state: "SP",
        city: "São Paulo",
        address: "Rua Test 123",
        latitude: -23.5489,
        longitude: -46.6388
      },
      {
        name: "Loja RJ",
        cnpj: "11222333000182",
        state: "RJ",
        city: "Rio de Janeiro",
        address: "Av Test 456",
        latitude: -22.9068,
        longitude: -43.1729
      },
      {
        name: "Loja SP Campinas",
        cnpj: "11222333000183",
        state: "SP",
        city: "Campinas",
        address: "Rua Campinas 789",
        latitude: -22.9099,
        longitude: -47.0626
      }
    ]

    it('should return all stores without filters', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({})

      expect(result.data).toHaveLength(3)
      expect(result.total).toBe(3)
      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
      expect(result.totalPages).toBe(1)
    })

    it('should use default pagination values', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({})

      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
    })

    it('should apply pagination correctly', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({
        page: 2,
        limit: 2
      })

      expect(result.data).toHaveLength(1)
      expect(result.page).toBe(2)
      expect(result.limit).toBe(2)
      expect(result.total).toBe(3)
      expect(result.totalPages).toBe(2)
    })

    it('should limit maximum page size to 100', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({ limit: 150 })

      expect(result.limit).toBe(100)
    })

    it('should filter by state', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({ state: "SP" })

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(2)
      result.data.forEach(store => {
        expect(store.state).toBe("SP")
      })
    })

    it('should filter by city', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({ city: "São Paulo" })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].city).toBe("São Paulo")
    })

    it('should filter by name', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({ name: "Loja RJ" })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].name).toBe("Loja RJ")
    })

    it('should combine multiple filters', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({
        state: "SP",
        city: "São Paulo"
      })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].state).toBe("SP")
      expect(result.data[0].city).toBe("São Paulo")
    })

    it('should apply trim to filters', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({
        state: "  SP  ",
        city: "  São Paulo  "
      })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].state).toBe("SP")
      expect(result.data[0].city).toBe("São Paulo")
    })

    it('should return empty result when no stores are found', async () => {
      mockRepository.seed(sampleStores)

      const result = await getStoresService.execute({ state: "XX" })

      expect(result.data).toHaveLength(0)
      expect(result.total).toBe(0)
      expect(result.totalPages).toBe(0)
    })

    it('should call repository with correct query', async () => {
      const findManySpy = jest.spyOn(mockRepository, 'findMany')

      await getStoresService.execute({
        page: 2,
        limit: 5,
        state: "SP",
        city: "São Paulo",
        name: "Test"
      })

      expect(findManySpy).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        state: "SP",
        city: "São Paulo",
        name: "Test"
      })
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'findMany').mockRejectedValue(error)

      await expect(getStoresService.execute({}))
        .rejects
        .toThrow('Database error')
    })
  })
})
