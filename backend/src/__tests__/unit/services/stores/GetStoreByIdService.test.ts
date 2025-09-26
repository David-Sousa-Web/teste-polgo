import { GetStoreByIdService } from "../../../../services/stores/GetStoreByIdService"
import { MockStoresRepository } from "../../../helpers/MockStoresRepository"
import { NotFoundError } from "../../../../services/errors/ServiceError"
import { Store } from "../../../../repositories/stores/IStoresRepository"

describe('GetStoreByIdService', () => {
  let getStoreByIdService: GetStoreByIdService
  let mockRepository: MockStoresRepository

  beforeEach(() => {
    mockRepository = new MockStoresRepository()
    getStoreByIdService = new GetStoreByIdService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleStore = {
      name: "Loja Teste",
      cnpj: "11222333000181",
      state: "SP",
      city: "São Paulo",
      address: "Rua Test 123",
      latitude: -23.5489,
      longitude: -46.6388
    }

    it('should return an existing store', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await getStoreByIdService.execute({ id: storeId })

      expect(result).toEqual(stores[0])
    })

    it('should throw NotFoundError for non-existent ID', async () => {
      const nonExistentId = "123456789012345678901234"

      await expect(getStoreByIdService.execute({ id: nonExistentId }))
        .rejects
        .toThrow(NotFoundError)

      await expect(getStoreByIdService.execute({ id: nonExistentId }))
        .rejects
        .toThrow("Loja não encontrada")
    })

    it('should call repository with correct ID', async () => {
      const findByIdSpy = jest.spyOn(mockRepository, 'findById')
      const testId = "123456789012345678901234"

      findByIdSpy.mockResolvedValue(null)

      try {
        await getStoreByIdService.execute({ id: testId })
      } catch (error) {
      }

      expect(findByIdSpy).toHaveBeenCalledWith(testId)
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'findById').mockRejectedValue(error)

      await expect(getStoreByIdService.execute({ id: "123456789012345678901234" }))
        .rejects
        .toThrow('Database error')
    })

    it('should work with different valid ID formats', async () => {
      const store1 = { ...sampleStore, name: "Loja A" }
      const store2 = { ...sampleStore, name: "Loja B" }
      
      mockRepository.seed([store1, store2])
      const stores = mockRepository.getAll()

      const result1 = await getStoreByIdService.execute({ id: stores[0].id })
      const result2 = await getStoreByIdService.execute({ id: stores[1].id })

      expect(result1.name).toBe("Loja A")
      expect(result2.name).toBe("Loja B")
    })
  })
})
