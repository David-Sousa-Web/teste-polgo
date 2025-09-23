import { Request, Response } from "express"
import { z } from "zod"
import { WinnersFactory } from "../../factories/WinnersFactory"
import { ServiceError } from "../../services/errors/ServiceError"
import { ApiResponse, ApiErrorResponse } from "../../types/ApiResponse"
import { createWinnerSchema } from "./schemas"

export class CreateWinnerController {
  async execute(req: Request, res: Response) {
    try {
      const validatedBody = createWinnerSchema.parse(req.body)
      
      const createWinnerService = WinnersFactory.createWinnerService()
      const winner = await createWinnerService.execute({
        ...validatedBody,
        drawDate: new Date(validatedBody.drawDate)
      })

      const response: ApiResponse = {
        success: true,
        data: winner,
        message: "Ganhador criado com sucesso"
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
