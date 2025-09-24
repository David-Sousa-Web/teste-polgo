import { Request, Response } from "express"
import { z } from "zod"
import { StoresFactory } from "../../factories/StoresFactory"
import { ServiceError } from "../../services/errors/ServiceError"
import { ApiResponse, ApiErrorResponse } from "../../types/ApiResponse"
import { getStoresQuerySchema } from "./schemas"

export class GetStoresController {
  async execute(req: Request, res: Response) {
    try {
      const validatedQuery = getStoresQuerySchema.parse(req.query)
      
      const getStoresService = StoresFactory.getStoresService()
      const result = await getStoresService.execute(validatedQuery)

      const response: ApiResponse = {
        success: true,
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages
        },
        message: "Dados recuperados com sucesso"
      }

      res.status(200).json(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: "Parâmetros inválidos",
          errors: error.issues.map((e: any) => e.message)
        }
        return res.status(400).json(errorResponse)
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
