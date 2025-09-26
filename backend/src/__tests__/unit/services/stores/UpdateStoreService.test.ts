import { UpdateStoreService } from "../../../../services/stores/UpdateStoreService"
import { MockStoresRepository } from "../../../helpers/MockStoresRepository"
import { NotFoundError, ConflictError } from "../../../../services/errors/ServiceError"

const mockGeocodingService = {
  getCoordinates: jest.fn().mockResolvedValue({
    latitude: -23.5489,
    longitude: -46.6388,
    display_name: "Test Address"
  }),
  reverseGeocode: jest.fn().mockResolvedValue("Test Address")
}

describe('UpdateStoreService', () => {
  let updateStoreService: UpdateStoreService
  let mockRepository: MockStoresRepository

  beforeEach(() => {
    mockRepository = new MockStoresRepository()
    updateStoreService = new UpdateStoreService(mockRepository, mockGeocodingService as any)
    jest.clearAllMocks()
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const sampleStore = {
      name: "Loja Original",
      cnpj: "11222333000181",
      state: "SP",
      city: "São Paulo",
      address: "Rua Original 123",
      latitude: -23.5489,
      longitude: -46.6388
    }

    it('should update a store with all fields', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const updateData = {
        id: storeId,
        name: "Loja Atualizada",
        cnpj: "11222333000182",
        state: "RJ",
        city: "Rio de Janeiro",
        address: "Av Atualizada 456"
      }

      const result = await updateStoreService.execute(updateData)

      expect(result).toMatchObject({
        id: storeId,
        name: "Loja Atualizada",
        cnpj: "11222333000182",
        state: "RJ",
        city: "Rio de Janeiro",
        address: "Av Atualizada 456"
      })
    })

    it('should update only the name', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        name: "Novo Nome"
      })

      expect(result.name).toBe("Novo Nome")
      expect(result.state).toBe("SP")
      expect(result.city).toBe("São Paulo")
      expect(result.cnpj).toBe("11222333000181")
    })

    it('should apply trim to name', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        name: "  Novo Nome  "
      })

      expect(result.name).toBe("Novo Nome")
    })

    it('should convert state to uppercase and apply trim', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        state: "  rj  "
      })

      expect(result.state).toBe("RJ")
    })

    it('should apply trim to city', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        city: "  Rio de Janeiro  "
      })

      expect(result.city).toBe("Rio de Janeiro")
    })

    it('should apply trim to address', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        address: "  Nova Rua 456  "
      })

      expect(result.address).toBe("Nova Rua 456")
    })

    it('should clean CNPJ formatting', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        cnpj: "11.222.333/0001-82"
      })

      expect(result.cnpj).toBe("11222333000182")
    })

    it('should throw NotFoundError for non-existent ID', async () => {
      const nonExistentId = "123456789012345678901234"

      await expect(updateStoreService.execute({
        id: nonExistentId,
        name: "Novo Nome"
      }))
        .rejects
        .toThrow(NotFoundError)

      await expect(updateStoreService.execute({
        id: nonExistentId,
        name: "Novo Nome"
      }))
        .rejects
        .toThrow("Loja não encontrada")
    })

    it('should throw ConflictError if CNPJ already exists', async () => {
      const store1 = { ...sampleStore, cnpj: "11222333000181" }
      const store2 = { ...sampleStore, cnpj: "11222333000182" }

      mockRepository.seed([store1, store2])
      const stores = mockRepository.getAll()

      await expect(updateStoreService.execute({
        id: stores[0].id,
        cnpj: "11222333000182"
      }))
        .rejects
        .toThrow(ConflictError)

      await expect(updateStoreService.execute({
        id: stores[0].id,
        cnpj: "11222333000182"
      }))
        .rejects
        .toThrow("Já existe uma loja cadastrada com este CNPJ")
    })

    it('should allow updating with same CNPJ', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const result = await updateStoreService.execute({
        id: storeId,
        cnpj: "11222333000181",
        name: "Nome Atualizado"
      })

      expect(result.cnpj).toBe("11222333000181")
      expect(result.name).toBe("Nome Atualizado")
    })

    it('should call geocoding service when address fields are updated', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      await updateStoreService.execute({
        id: storeId,
        address: "Nova Rua 456"
      })

      expect(mockGeocodingService.getCoordinates).toHaveBeenCalledWith("Nova Rua 456", "São Paulo", "SP")
    })

    it('should not call geocoding service when no address fields are updated', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      await updateStoreService.execute({
        id: storeId,
        name: "Novo Nome"
      })

      expect(mockGeocodingService.getCoordinates).not.toHaveBeenCalled()
    })

    it('should handle geocoding service returning null', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      mockGeocodingService.getCoordinates.mockResolvedValueOnce(null)

      const result = await updateStoreService.execute({
        id: storeId,
        address: "Nova Rua 456"
      })

      expect(result.address).toBe("Nova Rua 456")
    })

    it('should call findById to verify existence', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const findByIdSpy = jest.spyOn(mockRepository, 'findById')

      await updateStoreService.execute({
        id: storeId,
        name: "Novo Nome"
      })

      expect(findByIdSpy).toHaveBeenCalledWith(storeId)
    })

    it('should call update with correct data', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      const updateSpy = jest.spyOn(mockRepository, 'update')

      await updateStoreService.execute({
        id: storeId,
        name: "Novo Nome",
        cnpj: "11222333000182"
      })

      expect(updateSpy).toHaveBeenCalledWith(storeId, {
        name: "Novo Nome",
        cnpj: "11222333000182"
      })
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'findById').mockRejectedValue(error)

      await expect(updateStoreService.execute({
        id: "123456789012345678901234",
        name: "Novo Nome"
      }))
        .rejects
        .toThrow('Database error')
    })

    it('should throw NotFoundError if update returns null', async () => {
      mockRepository.seed([sampleStore])
      const stores = mockRepository.getAll()
      const storeId = stores[0].id

      jest.spyOn(mockRepository, 'update').mockResolvedValue(null)

      await expect(updateStoreService.execute({
        id: storeId,
        name: "Novo Nome"
      }))
        .rejects
        .toThrow(NotFoundError)
    })
  })
})
