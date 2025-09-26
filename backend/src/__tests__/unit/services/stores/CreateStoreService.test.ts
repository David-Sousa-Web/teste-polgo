import { CreateStoreService } from "../../../../services/stores/CreateStoreService"
import { MockStoresRepository } from "../../../helpers/MockStoresRepository"
import { ConflictError } from "../../../../services/errors/ServiceError"

const mockGeocodingService = {
  getCoordinates: jest.fn().mockResolvedValue({
    latitude: -23.5489,
    longitude: -46.6388,
    display_name: "Test Address"
  }),
  reverseGeocode: jest.fn().mockResolvedValue("Test Address")
}

describe('CreateStoreService', () => {
  let createStoreService: CreateStoreService
  let mockRepository: MockStoresRepository

  beforeEach(() => {
    mockRepository = new MockStoresRepository()
    createStoreService = new CreateStoreService(mockRepository, mockGeocodingService as any)
    jest.clearAllMocks()
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const validStoreData = {
      name: "Loja Teste",
      cnpj: "11222333000181",
      state: "SP",
      city: "São Paulo",
      address: "Rua Test 123"
    }

    it('should create a store with valid data', async () => {
      const result = await createStoreService.execute(validStoreData)

      expect(result).toMatchObject({
        name: "Loja Teste",
        cnpj: "11222333000181",
        state: "SP",
        city: "São Paulo",
        address: "Rua Test 123"
      })
      expect(result.id).toBeDefined()
      expect(result.latitude).toBe(-23.5489)
      expect(result.longitude).toBe(-46.6388)
    })

    it('should apply trim to name', async () => {
      const dataWithSpaces = {
        ...validStoreData,
        name: "  Loja Teste  "
      }

      const result = await createStoreService.execute(dataWithSpaces)

      expect(result.name).toBe("Loja Teste")
    })

    it('should convert state to uppercase and apply trim', async () => {
      const dataWithLowerCaseState = {
        ...validStoreData,
        state: "  sp  "
      }

      const result = await createStoreService.execute(dataWithLowerCaseState)

      expect(result.state).toBe("SP")
    })

    it('should apply trim to city', async () => {
      const dataWithSpaces = {
        ...validStoreData,
        city: "  São Paulo  "
      }

      const result = await createStoreService.execute(dataWithSpaces)

      expect(result.city).toBe("São Paulo")
    })

    it('should apply trim to address', async () => {
      const dataWithSpaces = {
        ...validStoreData,
        address: "  Rua Test 123  "
      }

      const result = await createStoreService.execute(dataWithSpaces)

      expect(result.address).toBe("Rua Test 123")
    })

    it('should clean CNPJ formatting', async () => {
      const dataWithFormattedCnpj = {
        ...validStoreData,
        cnpj: "11.222.333/0001-81"
      }

      const result = await createStoreService.execute(dataWithFormattedCnpj)

      expect(result.cnpj).toBe("11222333000181")
    })

    it('should throw ConflictError if CNPJ already exists', async () => {
      const existingStore = {
        name: "Loja Existente",
        cnpj: "11222333000181",
        state: "RJ",
        city: "Rio de Janeiro",
        address: "Rua Existente 456",
        latitude: null,
        longitude: null
      }

      mockRepository.seed([existingStore])

      await expect(createStoreService.execute(validStoreData))
        .rejects
        .toThrow(ConflictError)

      await expect(createStoreService.execute(validStoreData))
        .rejects
        .toThrow("Já existe uma loja cadastrada com este CNPJ")
    })

    it('should handle geocoding service returning null', async () => {
      mockGeocodingService.getCoordinates.mockResolvedValueOnce(null)

      const result = await createStoreService.execute(validStoreData)

      expect(result.latitude).toBeNull()
      expect(result.longitude).toBeNull()
    })

    it('should call repository with correct data', async () => {
      const createSpy = jest.spyOn(mockRepository, 'create')

      await createStoreService.execute(validStoreData)

      expect(createSpy).toHaveBeenCalledWith({
        name: "Loja Teste",
        cnpj: "11222333000181",
        state: "SP",
        city: "São Paulo",
        address: "Rua Test 123",
        latitude: -23.5489,
        longitude: -46.6388
      })
    })

    it('should call geocoding service with correct parameters', async () => {
      await createStoreService.execute(validStoreData)

      expect(mockGeocodingService.getCoordinates).toHaveBeenCalledWith("Rua Test 123", "São Paulo", "SP")
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'create').mockRejectedValue(error)

      await expect(createStoreService.execute(validStoreData))
        .rejects
        .toThrow('Database error')
    })

    it('should handle geocoding service errors gracefully', async () => {
      mockGeocodingService.getCoordinates.mockRejectedValueOnce(new Error('Geocoding error'))

      await expect(createStoreService.execute(validStoreData))
        .rejects
        .toThrow('Geocoding error')
    })
  })
})
