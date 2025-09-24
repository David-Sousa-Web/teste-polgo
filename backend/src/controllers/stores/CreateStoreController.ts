import { Request, Response } from "express"
import { z } from "zod"
import { StoresFactory } from "../../factories/StoresFactory"
import { ServiceError, ConflictError } from "../../services/errors/ServiceError"
import { ApiResponse, ApiErrorResponse } from "../../types/ApiResponse"
import { createStoreSchema } from "./schemas"

export class CreateStoreController {
  async execute(req: Request, res: Response) {
    try {
      const validatedBody = createStoreSchema.parse(req.body)
      
      const createStoreService = StoresFactory.createStoreService()
      const store = await createStoreService.execute(validatedBody)

      const response: ApiResponse = {
        success: true,
        data: store,
        message: "Loja criada com sucesso"
      }

      res.status(201).json(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: "Dados inválidos",
          errors: error.issues.map((e: any) => e.message)
        }
        return res.status(400).json(errorResponse)
      }

      if (error instanceof ConflictError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: error.message
        }
        return res.status(409).json(errorResponse)
      }

      if (error instanceof ServiceError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: error.message
        }
        return res.status(error.statusCode).json(errorResponse)
      }

      const errorResponse: ApiErrorResponse = {
        success: false,
        message: "Erro interno do servidor"
      }
      res.status(500).json(errorResponse)
    }
  }
}
