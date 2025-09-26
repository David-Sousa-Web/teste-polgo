import request from 'supertest'
import express from 'express'
import { winnersRoutes } from '../../routes/winnersRoutes'

jest.mock('../../middlewares/authMiddleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => next()
}))
const mockWinnersRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findMany: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  countByState: jest.fn()
}

jest.mock('../../factories/WinnersFactory', () => ({
  WinnersFactory: {
    createWinnerService: () => ({
      execute: mockWinnersRepository.create
    }),
    getWinnerByIdService: () => ({
      execute: mockWinnersRepository.findById
    }),
    getWinnersService: () => ({
      execute: mockWinnersRepository.findMany
    }),
    updateWinnerService: () => ({
      execute: mockWinnersRepository.update
    }),
    deleteWinnerService: () => ({
      execute: mockWinnersRepository.delete
    }),
    getWinnersAggregationService: () => ({
      execute: mockWinnersRepository.countByState
    })
  }
}))

describe('Winners Integration Tests', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/winners', winnersRoutes)
    
    jest.clearAllMocks()
  })

  describe('POST /winners', () => {
    const validWinnerData = {
      fullName: "João Silva Santos",
      state: "SP",
      city: "São Paulo",
      prize: "R$ 1.000,00",
      drawDate: "2024-01-15T10:00:00.000Z"
    }

    it('should create a winner with valid data', async () => {
      const expectedResponse = {
        id: "507f1f77bcf86cd799439011",
        ...validWinnerData,
        drawDate: new Date(validWinnerData.drawDate)
      }

      mockWinnersRepository.create.mockResolvedValue(expectedResponse)

      const response = await request(app)
        .post('/winners')
        .send(validWinnerData)

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({
        success: true,
        message: "Ganhador criado com sucesso",
        data: expect.objectContaining({
          id: expectedResponse.id,
          fullName: validWinnerData.fullName,
          state: validWinnerData.state,
          city: validWinnerData.city,
          prize: validWinnerData.prize
        })
      })
    })

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        fullName: "J",
        state: "SP",
        city: "São Paulo",
        prize: "R$ 1.000,00",
        drawDate: "2024-01-15T10:00:00.000Z"
      }

      const response = await request(app)
        .post('/winners')
        .send(invalidData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 400 for invalid state', async () => {
      const invalidData = {
        ...validWinnerData,
        state: "XY"
      }

      const response = await request(app)
        .post('/winners')
        .send(invalidData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 400 for invalid date', async () => {
      const invalidData = {
        ...validWinnerData,
        drawDate: "data-invalida"
      }

      const response = await request(app)
        .post('/winners')
        .send(invalidData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })
  })

  describe('GET /winners/:id', () => {
    const sampleWinner = {
      id: "507f1f77bcf86cd799439011",
      fullName: "João Silva",
      state: "SP",
      city: "São Paulo",
      prize: "R$ 1.000,00",
      drawDate: new Date('2024-01-15T10:00:00.000Z')
    }

    it('should return an existing winner', async () => {
      mockWinnersRepository.findById.mockResolvedValue(sampleWinner)

      const response = await request(app)
        .get(`/winners/${sampleWinner.id}`)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        data: expect.objectContaining({
          id: sampleWinner.id,
          fullName: sampleWinner.fullName
        })
      })
    })

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/winners/invalid-id')

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "ID inválido"
      })
    })

    it('should return 404 for winner not found', async () => {
      const { NotFoundError } = require('../../services/errors/ServiceError')
      mockWinnersRepository.findById.mockRejectedValue(new NotFoundError("Ganhador não encontrado"))

      const response = await request(app)
        .get('/winners/507f1f77bcf86cd799439012')

      expect(response.status).toBe(404)
      expect(response.body).toMatchObject({
        success: false,
        message: "Ganhador não encontrado"
      })
    })
  })

  describe('GET /winners', () => {
    const sampleWinners = {
      data: [
        {
          id: "507f1f77bcf86cd799439011",
          fullName: "João Silva",
          state: "SP",
          city: "São Paulo",
          prize: "R$ 1.000,00",
          drawDate: new Date('2024-01-15T10:00:00.000Z')
        }
      ],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    }

    it('should return list of winners', async () => {
      mockWinnersRepository.findMany.mockResolvedValue(sampleWinners)

      const response = await request(app)
        .get('/winners')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        data: expect.any(Array),
        pagination: expect.objectContaining({
          total: expect.any(Number),
          page: expect.any(Number),
          limit: expect.any(Number),
          totalPages: expect.any(Number)
        })
      })
    })

    it('should accept query parameters', async () => {
      mockWinnersRepository.findMany.mockResolvedValue(sampleWinners)

      const response = await request(app)
        .get('/winners')
        .query({
          page: '2',
          limit: '5',
          state: 'SP',
          city: 'São Paulo'
        })

      expect(response.status).toBe(200)
      expect(mockWinnersRepository.findMany).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        state: 'SP',
        city: 'São Paulo'
      })
    })
  })

  describe('PUT /winners/:id', () => {
    const winnerId = "507f1f77bcf86cd799439011"
    const updateData = {
      fullName: "João Silva Santos",
      city: "Campinas"
    }

    it('should update an existing winner', async () => {
      const updatedWinner = {
        id: winnerId,
        fullName: "João Silva Santos",
        state: "SP",
        city: "Campinas",
        prize: "R$ 1.000,00",
        drawDate: new Date('2024-01-15T10:00:00.000Z')
      }

      mockWinnersRepository.update.mockResolvedValue(updatedWinner)

      const response = await request(app)
        .put(`/winners/${winnerId}`)
        .send(updateData)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        message: "Ganhador atualizado com sucesso",
        data: expect.objectContaining({
          id: winnerId,
          fullName: "João Silva Santos",
          city: "Campinas"
        })
      })
    })

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .put('/winners/invalid-id')
        .send(updateData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 404 for winner not found', async () => {
      const { NotFoundError } = require('../../services/errors/ServiceError')
      mockWinnersRepository.update.mockRejectedValue(new NotFoundError("Ganhador não encontrado"))

      const response = await request(app)
        .put(`/winners/${winnerId}`)
        .send(updateData)

      expect(response.status).toBe(404)
      expect(response.body).toMatchObject({
        success: false,
        message: "Ganhador não encontrado"
      })
    })
  })

  describe('DELETE /winners/:id', () => {
    const winnerId = "507f1f77bcf86cd799439011"

    it('should delete an existing winner', async () => {
      mockWinnersRepository.delete.mockResolvedValue(undefined)

      const response = await request(app)
        .delete(`/winners/${winnerId}`)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        message: "Ganhador excluído com sucesso"
      })
    })

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .delete('/winners/invalid-id')

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "ID inválido"
      })
    })

    it('should return 404 for winner not found', async () => {
      const { NotFoundError } = require('../../services/errors/ServiceError')
      mockWinnersRepository.delete.mockRejectedValue(new NotFoundError("Ganhador não encontrado"))

      const response = await request(app)
        .delete(`/winners/${winnerId}`)

      expect(response.status).toBe(404)
      expect(response.body).toMatchObject({
        success: false,
        message: "Ganhador não encontrado"
      })
    })
  })

  describe('GET /winners/agregacao', () => {
    const aggregationData = [
      { state: "SP", count: 5 },
      { state: "RJ", count: 3 },
      { state: "MG", count: 2 }
    ]

    it('should return winners aggregation by state', async () => {
      mockWinnersRepository.countByState.mockResolvedValue(aggregationData)

      const response = await request(app)
        .get('/winners/agregacao')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        data: aggregationData
      })
    })

    it('should return empty array when there is no data', async () => {
      mockWinnersRepository.countByState.mockResolvedValue([])

      const response = await request(app)
        .get('/winners/agregacao')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        data: []
      })
    })
  })
})
