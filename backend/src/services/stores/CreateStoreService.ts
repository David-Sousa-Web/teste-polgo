import { IStoresRepository, Store } from "../../repositories/stores/IStoresRepository"
import { ConflictError } from "../errors/ServiceError"
import { GeocodingService } from "../geocoding/GeocodingService"
import { cleanCNPJ } from "../../utils/cnpjValidation"

interface CreateStoreRequest {
  name: string
  cnpj: string
  state: string
  city: string
  address: string
}

export class CreateStoreService {
  constructor(
    private storesRepository: IStoresRepository,
    private geocodingService: GeocodingService
  ) {}

  async execute(data: CreateStoreRequest): Promise<Store> {
    const { name, cnpj, state, city, address } = data

    const cleanedCnpj = cleanCNPJ(cnpj)
    const existingStore = await this.storesRepository.findByCnpj(cleanedCnpj)
    if (existingStore) {
      throw new ConflictError("Já existe uma loja cadastrada com este CNPJ")
    }

    const coordinates = await this.geocodingService.getCoordinates(address, city, state)
    
    const createData = {
      name: name.trim(),
      cnpj: cleanedCnpj,
      state: state.toUpperCase().trim(),
      city: city.trim(),
      address: address.trim(),
      latitude: coordinates?.latitude || null,
      longitude: coordinates?.longitude || null,
    }

    const result = await this.storesRepository.create(createData)
    return result
  }
}
