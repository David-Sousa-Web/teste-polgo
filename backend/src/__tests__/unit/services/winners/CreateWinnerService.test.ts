import { CreateWinnerService } from "../../../../services/winners/CreateWinnerService"
import { MockWinnersRepository } from "../../../helpers/MockWinnersRepository"
import { ValidationError } from "../../../../services/errors/ServiceError"

describe('CreateWinnerService', () => {
  let createWinnerService: CreateWinnerService
  let mockRepository: MockWinnersRepository

  beforeEach(() => {
    mockRepository = new MockWinnersRepository()
    createWinnerService = new CreateWinnerService(mockRepository)
  })

  afterEach(() => {
    mockRepository.clear()
  })

  describe('execute', () => {
    const validWinnerData = {
      fullName: "João Silva Santos",
      state: "SP",
      city: "São Paulo",
      prize: "R$ 1.000,00",
      drawDate: new Date('2024-01-15T10:00:00.000Z')
    }

    it('should create a winner with valid data', async () => {
      const result = await createWinnerService.execute(validWinnerData)

      expect(result).toMatchObject({
        fullName: "João Silva Santos",
        state: "SP",
        city: "São Paulo",
        prize: "R$ 1.000,00",
        drawDate: validWinnerData.drawDate
      })
      expect(result.id).toBeDefined()
    })

    it('should apply trim to fullName', async () => {
      const dataWithSpaces = {
        ...validWinnerData,
        fullName: "  João Silva Santos  "
      }

      const result = await createWinnerService.execute(dataWithSpaces)

      expect(result.fullName).toBe("João Silva Santos")
    })

    it('should convert state to uppercase and apply trim', async () => {
      const dataWithLowerCaseState = {
        ...validWinnerData,
        state: "  sp  "
      }

      const result = await createWinnerService.execute(dataWithLowerCaseState)

      expect(result.state).toBe("SP")
    })

    it('should apply trim to city', async () => {
      const dataWithSpaces = {
        ...validWinnerData,
        city: "  São Paulo  "
      }

      const result = await createWinnerService.execute(dataWithSpaces)

      expect(result.city).toBe("São Paulo")
    })

    it('should apply trim to prize', async () => {
      const dataWithSpaces = {
        ...validWinnerData,
        prize: "  R$ 1.000,00  "
      }

      const result = await createWinnerService.execute(dataWithSpaces)

      expect(result.prize).toBe("R$ 1.000,00")
    })

    it('should reject future dates', async () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)

      const dataWithFutureDate = {
        ...validWinnerData,
        drawDate: futureDate
      }

      await expect(createWinnerService.execute(dataWithFutureDate))
        .rejects
        .toThrow(ValidationError)

      await expect(createWinnerService.execute(dataWithFutureDate))
        .rejects
        .toThrow("Data do sorteio não pode ser futura")
    })

    it('should accept present date', async () => {
      const now = new Date()
      const dataWithCurrentDate = {
        ...validWinnerData,
        drawDate: now
      }

      const result = await createWinnerService.execute(dataWithCurrentDate)

      expect(result.drawDate).toEqual(now)
    })

    it('should accept past date', async () => {
      const pastDate = new Date('2023-12-01T10:00:00.000Z')
      const dataWithPastDate = {
        ...validWinnerData,
        drawDate: pastDate
      }

      const result = await createWinnerService.execute(dataWithPastDate)

      expect(result.drawDate).toEqual(pastDate)
    })

    it('should call repository with correct data', async () => {
      const createSpy = jest.spyOn(mockRepository, 'create')

      await createWinnerService.execute(validWinnerData)

      expect(createSpy).toHaveBeenCalledWith({
        fullName: "João Silva Santos",
        state: "SP",
        city: "São Paulo",
        prize: "R$ 1.000,00",
        drawDate: validWinnerData.drawDate
      })
    })

    it('should propagate repository errors', async () => {
      const error = new Error('Database error')
      jest.spyOn(mockRepository, 'create').mockRejectedValue(error)

      await expect(createWinnerService.execute(validWinnerData))
        .rejects
        .toThrow('Database error')
    })
  })
})
