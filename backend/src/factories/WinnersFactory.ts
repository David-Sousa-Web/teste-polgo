import { prisma } from "../lib/prisma"
import { PrismaWinnersRepository } from "../repositories/prisma-repositories/winners/PrismaWinnersRepository"
import { CreateWinnerService } from "../services/winners/CreateWinnerService"
import { GetWinnersService } from "../services/winners/GetWinnersService"
import { GetWinnerByIdService } from "../services/winners/GetWinnerByIdService"
import { UpdateWinnerService } from "../services/winners/UpdateWinnerService"
import { DeleteWinnerService } from "../services/winners/DeleteWinnerService"
import { GetWinnersAggregationService } from "../services/winners/GetWinnersAggregationService"

export class WinnersFactory {
  private static winnersRepository = new PrismaWinnersRepository(prisma)

  static createWinnerService() {
    return new CreateWinnerService(this.winnersRepository)
  }

  static getWinnersService() {
    return new GetWinnersService(this.winnersRepository)
  }

  static getWinnerByIdService() {
    return new GetWinnerByIdService(this.winnersRepository)
  }

  static updateWinnerService() {
    return new UpdateWinnerService(this.winnersRepository)
  }

  static deleteWinnerService() {
    return new DeleteWinnerService(this.winnersRepository)
  }

  static getWinnersAggregationService() {
    return new GetWinnersAggregationService(this.winnersRepository)
  }
}
