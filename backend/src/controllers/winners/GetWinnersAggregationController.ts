import { Request, Response } from "express"
import { WinnersFactory } from "../../factories/WinnersFactory"
import { ServiceError } from "../../services/errors/ServiceError"
import { ApiResponse, ApiErrorResponse } from "../../types/ApiResponse"

export class GetWinnersAggregationController {
  async execute(req: Request, res: Response) {
    try {
      const getWinnersAggregationService = WinnersFactory.getWinnersAggregationService()
      const aggregation = await getWinnersAggregationService.execute()

      const response: ApiResponse = {
        success: true,
        data: aggregation,
        message: "Agregação por estado recuperada com sucesso"
      }

      res.status(200).json(response)
    } catch (error) {
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
