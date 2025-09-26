import { DeleteWinnerService } from "../../../../services/winners/DeleteWinnerService"
import { MockWinnersRepository } from "../../../helpers/MockWinnersRepository"
import { NotFoundError } from "../../../../services/errors/ServiceError"

describe('DeleteWinnerService', () => {
  let deleteWinnerService: DeleteWinnerService
  let mockRepository: MockWinnersRepository

  beforeEach(() => {
    mockRepository = new MockWinnersRepository()
    deleteWinnerService = new DeleteWinnerService(mockRepository)
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
      }
    ]

    it('should delete an existing winner', async () => {
      mockRepository.seed(sampleWinners)
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      await deleteWinnerService.execute({ id: winnerId })

      const remainingWinners = mockRepository.getAll()
      expect(remainingWinners).toHaveLength(1)
      expect(remainingWinners.find(w => w.id === winnerId)).toBeUndefined()
    })

    it('should throw NotFoundError for non-existent ID', async () => {
      const nonExistentId = "123456789012345678901234"

      await expect(deleteWinnerService.execute({ id: nonExistentId }))
        .rejects
        .toThrow(NotFoundError)

      await expect(deleteWinnerService.execute({ id: nonExistentId }))
        .rejects
        .toThrow("Ganhador não encontrado")
    })

    it('should call findById to verify existence', async () => {
      mockRepository.seed(sampleWinners)
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const findByIdSpy = jest.spyOn(mockRepository, 'findById')

      await deleteWinnerService.execute({ id: winnerId })

      expect(findByIdSpy).toHaveBeenCalledWith(winnerId)
    })

    it('should call delete with correct ID', async () => {
      mockRepository.seed(sampleWinners)
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const deleteSpy = jest.spyOn(mockRepository, 'delete')

      await deleteWinnerService.execute({ id: winnerId })

      expect(deleteSpy).toHaveBeenCalledWith(winnerId)
    })

    it('should not return value', async () => {
      mockRepository.seed(sampleWinners)
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const result = await deleteWinnerService.execute({ id: winnerId })

      expect(result).toBeUndefined()
    })

    it('should keep other winners intact', async () => {
      mockRepository.seed(sampleWinners)
      const winners = mockRepository.getAll()
      const winnerToDelete = winners[0]
      const winnerToKeep = winners[1]

      await deleteWinnerService.execute({ id: winnerToDelete.id })

      const remainingWinners = mockRepository.getAll()
      expect(remainingWinners).toHaveLength(1)
      expect(remainingWinners[0]).toEqual(winnerToKeep)
    })

    it('should propagate repository errors on findById', async () => {
      const error = new Error('Database connection error')
      jest.spyOn(mockRepository, 'findById').mockRejectedValue(error)

      await expect(deleteWinnerService.execute({ id: "123456789012345678901234" }))
        .rejects
        .toThrow('Database connection error')
    })

    it('should propagate repository errors on delete', async () => {
      mockRepository.seed(sampleWinners)
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      const error = new Error('Delete operation failed')
      jest.spyOn(mockRepository, 'delete').mockRejectedValue(error)

      await expect(deleteWinnerService.execute({ id: winnerId }))
        .rejects
        .toThrow('Delete operation failed')
    })

    it('should work with different valid ID formats', async () => {
      const winner1 = { ...sampleWinners[0], fullName: "Winner 1" }
      const winner2 = { ...sampleWinners[1], fullName: "Winner 2" }
      const winner3 = { ...sampleWinners[0], fullName: "Winner 3" }
      
      mockRepository.seed([winner1, winner2, winner3])
      const winners = mockRepository.getAll()

      await deleteWinnerService.execute({ id: winners[1].id })

      const remainingWinners = mockRepository.getAll()
      expect(remainingWinners).toHaveLength(2)
      expect(remainingWinners.map(w => w.fullName)).toEqual(["Winner 1", "Winner 3"])
    })

    it('should work when there is only one winner', async () => {
      mockRepository.seed([sampleWinners[0]])
      const winners = mockRepository.getAll()
      const winnerId = winners[0].id

      await deleteWinnerService.execute({ id: winnerId })

      const remainingWinners = mockRepository.getAll()
      expect(remainingWinners).toHaveLength(0)
    })
  })
})
