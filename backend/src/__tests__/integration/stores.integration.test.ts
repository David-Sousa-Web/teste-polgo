import request from 'supertest'
import express from 'express'
import { storesRoutes } from '../../routes/storesRoutes'

jest.mock('../../middlewares/authMiddleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => next()
}))

const mockStoresRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findMany: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByCnpj: jest.fn()
}

const mockGeocodingService = {
  getCoordinates: jest.fn(),
  reverseGeocode: jest.fn()
}

jest.mock('../../factories/StoresFactory', () => ({
  StoresFactory: {
    createStoreService: () => ({
      execute: mockStoresRepository.create
    }),
    getStoreByIdService: () => ({
      execute: mockStoresRepository.findById
    }),
    getStoresService: () => ({
      execute: mockStoresRepository.findMany
    }),
    updateStoreService: () => ({
      execute: mockStoresRepository.update
    }),
    deleteStoreService: () => ({
      execute: mockStoresRepository.delete
    })
  }
}))

describe('Stores Integration Tests', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/stores', storesRoutes)
    
    jest.clearAllMocks()
  })

  describe('POST /stores', () => {
    const validStoreData = {
      name: "Loja Teste",
      cnpj: "11222333000181",
      state: "SP",
      city: "São Paulo",
      address: "Rua Test 123"
    }

    it('should create a store with valid data', async () => {
      const expectedResponse = {
        id: "507f1f77bcf86cd799439011",
        ...validStoreData,
        latitude: -23.5489,
        longitude: -46.6388
      }

      mockStoresRepository.create.mockResolvedValue(expectedResponse)

      const response = await request(app)
        .post('/stores')
        .send(validStoreData)

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({
        success: true,
        message: "Loja criada com sucesso",
        data: expect.objectContaining({
          id: expectedResponse.id,
          name: validStoreData.name,
          cnpj: validStoreData.cnpj,
          state: validStoreData.state,
          city: validStoreData.city,
          address: validStoreData.address
        })
      })
    })

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        name: "L",
        cnpj: "invalid",
        state: "SP",
        city: "São Paulo",
        address: "Rua Test 123"
      }

      const response = await request(app)
        .post('/stores')
        .send(invalidData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 400 for invalid state', async () => {
      const invalidData = {
        ...validStoreData,
        state: "XX"
      }

      const response = await request(app)
        .post('/stores')
        .send(invalidData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 400 for invalid CNPJ', async () => {
      const invalidData = {
        ...validStoreData,
        cnpj: "invalid-cnpj"
      }

      const response = await request(app)
        .post('/stores')
        .send(invalidData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 409 for duplicate CNPJ', async () => {
      const { ConflictError } = require('../../services/errors/ServiceError')
      mockStoresRepository.create.mockRejectedValue(new ConflictError("Já existe uma loja cadastrada com este CNPJ"))

      const response = await request(app)
        .post('/stores')
        .send(validStoreData)

      expect(response.status).toBe(409)
      expect(response.body).toMatchObject({
        success: false,
        message: "Já existe uma loja cadastrada com este CNPJ"
      })
    })
  })

  describe('GET /stores/:id', () => {
    const sampleStore = {
      id: "507f1f77bcf86cd799439011",
      name: "Loja Teste",
      cnpj: "11222333000181",
      state: "SP",
      city: "São Paulo",
      address: "Rua Test 123",
      latitude: -23.5489,
      longitude: -46.6388
    }

    it('should return an existing store', async () => {
      mockStoresRepository.findById.mockResolvedValue(sampleStore)

      const response = await request(app)
        .get(`/stores/${sampleStore.id}`)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        data: expect.objectContaining({
          id: sampleStore.id,
          name: sampleStore.name
        })
      })
    })

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/stores/invalid-id')

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "ID inválido"
      })
    })

    it('should return 404 for store not found', async () => {
      const { NotFoundError } = require('../../services/errors/ServiceError')
      mockStoresRepository.findById.mockRejectedValue(new NotFoundError("Loja não encontrada"))

      const response = await request(app)
        .get('/stores/507f1f77bcf86cd799439012')

      expect(response.status).toBe(404)
      expect(response.body).toMatchObject({
        success: false,
        message: "Loja não encontrada"
      })
    })
  })

  describe('GET /stores', () => {
    const sampleStores = {
      data: [
        {
          id: "507f1f77bcf86cd799439011",
          name: "Loja Teste",
          cnpj: "11222333000181",
          state: "SP",
          city: "São Paulo",
          address: "Rua Test 123",
          latitude: -23.5489,
          longitude: -46.6388
        }
      ],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    }

    it('should return list of stores', async () => {
      mockStoresRepository.findMany.mockResolvedValue(sampleStores)

      const response = await request(app)
        .get('/stores')

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
      mockStoresRepository.findMany.mockResolvedValue(sampleStores)

      const response = await request(app)
        .get('/stores')
        .query({
          page: '2',
          limit: '5',
          state: 'SP',
          city: 'São Paulo',
          name: 'Loja'
        })

      expect(response.status).toBe(200)
      expect(mockStoresRepository.findMany).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        state: 'SP',
        city: 'São Paulo',
        name: 'Loja'
      })
    })
  })

  describe('PUT /stores/:id', () => {
    const storeId = "507f1f77bcf86cd799439011"
    const updateData = {
      name: "Loja Atualizada",
      city: "Campinas"
    }

    it('should update an existing store', async () => {
      const updatedStore = {
        id: storeId,
        name: "Loja Atualizada",
        cnpj: "11222333000181",
        state: "SP",
        city: "Campinas",
        address: "Rua Test 123",
        latitude: -23.5489,
        longitude: -46.6388
      }

      mockStoresRepository.update.mockResolvedValue(updatedStore)

      const response = await request(app)
        .put(`/stores/${storeId}`)
        .send(updateData)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        message: "Loja atualizada com sucesso",
        data: expect.objectContaining({
          id: storeId,
          name: "Loja Atualizada",
          city: "Campinas"
        })
      })
    })

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .put('/stores/invalid-id')
        .send(updateData)

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "Dados inválidos"
      })
    })

    it('should return 404 for store not found', async () => {
      const { NotFoundError } = require('../../services/errors/ServiceError')
      mockStoresRepository.update.mockRejectedValue(new NotFoundError("Loja não encontrada"))

      const response = await request(app)
        .put(`/stores/${storeId}`)
        .send(updateData)

      expect(response.status).toBe(404)
      expect(response.body).toMatchObject({
        success: false,
        message: "Loja não encontrada"
      })
    })

    it('should return 409 for duplicate CNPJ', async () => {
      const { ConflictError } = require('../../services/errors/ServiceError')
      mockStoresRepository.update.mockRejectedValue(new ConflictError("Já existe uma loja cadastrada com este CNPJ"))

      const response = await request(app)
        .put(`/stores/${storeId}`)
        .send({ cnpj: "11444777000161" })

      expect(response.status).toBe(409)
      expect(response.body).toMatchObject({
        success: false,
        message: "Já existe uma loja cadastrada com este CNPJ"
      })
    })
  })

  describe('DELETE /stores/:id', () => {
    const storeId = "507f1f77bcf86cd799439011"

    it('should delete an existing store', async () => {
      mockStoresRepository.delete.mockResolvedValue(undefined)

      const response = await request(app)
        .delete(`/stores/${storeId}`)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        message: "Loja excluída com sucesso"
      })
    })

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .delete('/stores/invalid-id')

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        success: false,
        message: "ID inválido"
      })
    })

    it('should return 404 for store not found', async () => {
      const { NotFoundError } = require('../../services/errors/ServiceError')
      mockStoresRepository.delete.mockRejectedValue(new NotFoundError("Loja não encontrada"))

      const response = await request(app)
        .delete(`/stores/${storeId}`)

      expect(response.status).toBe(404)
      expect(response.body).toMatchObject({
        success: false,
        message: "Loja não encontrada"
      })
    })
  })
})
