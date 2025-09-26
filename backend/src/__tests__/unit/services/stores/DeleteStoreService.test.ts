import { DeleteStoreService } from "../../../../services/stores/DeleteStoreService"
import { MockStoresRepository } from "../../../helpers/MockStoresRepository"
import { NotFoundError } from "../../../../services/errors/ServiceError"

describe('DeleteStoreService', () => {
  let deleteStoreService: DeleteStoreService
  let mockRepository: MockStoresRepository

  beforeEach(() => {
    mockRepository = new MockStoresRepository()
    deleteStoreService = new DeleteStoreService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleStores = [
      {
        name: "Loja A",
        cnpj: "11222333000181",
        state: "SP",
        city: "São Paulo",
        address: "Rua Test 123",
        latitude: -23.5489,
        longitude: -46.6388
      },
      {
        name: "Loja B",
        cnpj: "11222333000182",
        state: "RJ",
        city: "Rio de Janeiro",
        address: "Av Test 456",
        latitude: -22.9068,
        longitude: -43.1729
      }
    ]

    it('should delete an existing store', async () => {
      mockRepository.seed(sampleStores)
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      await deleteStoreService.execute({ id: storeId })

      const remainingStores = mockRepository.getAll()
      expect(remainingStores).toHaveLength(1)
      expect(remainingStores.find(s => s.id === storeId)).toBeUndefined()
    })

    it('should throw NotFoundError for non-existent ID', async () => {
      const nonExistentId = "123456789012345678901234"

      await expect(deleteStoreService.execute({ id: nonExistentId }))
        .rejects
        .toThrow(NotFoundError)

      await expect(deleteStoreService.execute({ id: nonExistentId }))
        .rejects
        .toThrow("Loja não encontrada")
    })

    it('should call findById to verify existence', async () => {
      mockRepository.seed(sampleStores)
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const findByIdSpy = jest.spyOn(mockRepository, 'findById')

      await deleteStoreService.execute({ id: storeId })

      expect(findByIdSpy).toHaveBeenCalledWith(storeId)
    })

    it('should call delete with correct ID', async () => {
      mockRepository.seed(sampleStores)
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const deleteSpy = jest.spyOn(mockRepository, 'delete')

      await deleteStoreService.execute({ id: storeId })

      expect(deleteSpy).toHaveBeenCalledWith(storeId)
    })

    it('should not return value', async () => {
      mockRepository.seed(sampleStores)
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await deleteStoreService.execute({ id: storeId })

      expect(result).toBeUndefined()
    })

    it('should keep other stores intact', async () => {
      mockRepository.seed(sampleStores)
      const stores = mockRepository.getAll()
      const storeToDelete = stores[0]
      const storeToKeep = stores[1]

      await deleteStoreService.execute({ id: storeToDelete.id })

      const remainingStores = mockRepository.getAll()
      expect(remainingStores).toHaveLength(1)
      expect(remainingStores[0]).toEqual(storeToKeep)
    })

    it('should propagate repository errors on findById', async () => {
      const error = new Error('Database connection error')
      jest.spyOn(mockRepository, 'findById').mockRejectedValue(error)

      await expect(deleteStoreService.execute({ id: "123456789012345678901234" }))
        .rejects
        .toThrow('Database connection error')
    })

    it('should propagate repository errors on delete', async () => {
      mockRepository.seed(sampleStores)
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const error = new Error('Delete operation failed')
      jest.spyOn(mockRepository, 'delete').mockRejectedValue(error)

      await expect(deleteStoreService.execute({ id: storeId }))
        .rejects
        .toThrow('Delete operation failed')
    })

    it('should work with different valid ID formats', async () => {
      const store1 = { ...sampleStores[0], name: "Store 1" }
      const store2 = { ...sampleStores[1], name: "Store 2" }
      const store3 = { ...sampleStores[0], name: "Store 3" }
      
      mockRepository.seed([store1, store2, store3])
      const stores = mockRepository.getAll()

      await deleteStoreService.execute({ id: stores[1].id })

      const remainingStores = mockRepository.getAll()
      expect(remainingStores).toHaveLength(2)
      expect(remainingStores.map(s => s.name)).toEqual(["Store 1", "Store 3"])
    })

    it('should work when there is only one store', async () => {
      mockRepository.seed([sampleStores[0]])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      await deleteStoreService.execute({ id: storeId })

      const remainingStores = mockRepository.getAll()
      expect(remainingStores).toHaveLength(0)
    })
  })
})
