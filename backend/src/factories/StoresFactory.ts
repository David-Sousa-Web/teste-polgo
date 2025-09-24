import { prisma } from "../lib/prisma"
import { PrismaStoresRepository } from "../repositories/prisma-repositories/stores/PrismaStoresRepository"
import { GeocodingService } from "../services/geocoding/GeocodingService"
import { CreateStoreService } from "../services/stores/CreateStoreService"
import { GetStoresService } from "../services/stores/GetStoresService"
import { GetStoreByIdService } from "../services/stores/GetStoreByIdService"
import { UpdateStoreService } from "../services/stores/UpdateStoreService"
import { DeleteStoreService } from "../services/stores/DeleteStoreService"

export class StoresFactory {
  private static storesRepository = new PrismaStoresRepository(prisma)
  private static geocodingService = new GeocodingService()

  static createStoreService() {
    return new CreateStoreService(this.storesRepository, this.geocodingService)
  }

  static getStoresService() {
    return new GetStoresService(this.storesRepository)
  }

  static getStoreByIdService() {
    return new GetStoreByIdService(this.storesRepository)
  }

  static updateStoreService() {
    return new UpdateStoreService(this.storesRepository, this.geocodingService)
  }

  static deleteStoreService() {
    return new DeleteStoreService(this.storesRepository)
  }

}
