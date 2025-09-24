import { Request, Response } from "express"
import { z } from "zod"
import { WinnersFactory } from "../../factories/WinnersFactory"
import { ServiceError, NotFoundError, ValidationError } from "../../services/errors/ServiceError"
import { ApiResponse, ApiErrorResponse } from "../../types/ApiResponse"
import { updateWinnerSchema, idParamSchema } from "./schemas"

export class UpdateWinnerController {
  async execute(req: Request, res: Response) {
    try {
      const validatedParams = idParamSchema.parse(req.params)
      const validatedBody = updateWinnerSchema.parse(req.body)
      
      const updateWinnerService = WinnersFactory.updateWinnerService()
      const winner = await updateWinnerService.execute({
        id: validatedParams.id,
        ...validatedBody,
        drawDate: validatedBody.drawDate ? new Date(validatedBody.drawDate) : undefined
      })

      const response: ApiResponse = {
        success: true,
        data: winner,
        message: "Ganhador atualizado com sucesso"
      }

      res.status(200).json(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: "Dados inválidos",
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

      if (error instanceof ValidationError) {
        const errorResponse: ApiErrorResponse = {
          success: false,
          message: error.message
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
