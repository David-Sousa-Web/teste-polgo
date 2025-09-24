import { Request, Response } from "express"
import { z } from "zod"
import { StoresFactory } from "../../factories/StoresFactory"
import { ServiceError, NotFoundError } from "../../services/errors/ServiceError"
import { ApiResponse, ApiErrorResponse } from "../../types/ApiResponse"
import { idParamSchema } from "./schemas"

export class DeleteStoreController {
  async execute(req: Request, res: Response) {
    try {
      const validatedParams = idParamSchema.parse(req.params)
      
      const deleteStoreService = StoresFactory.deleteStoreService()
      await deleteStoreService.execute({ id: validatedParams.id })

      const response: ApiResponse = {
        success: true,
        data: null,
        message: "Loja excluída com sucesso"
      }

      res.status(200).json(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: "ID inválido",
          errors: error.issues.map((e: any) => e.message)
        }
        return res.status(400).json(errorResponse)
      }

      if (error instanceof NotFoundError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: error.message
        }
        return res.status(404).json(errorResponse)
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
