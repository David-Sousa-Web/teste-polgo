import { IStoresRepository, Store } from "../../repositories/stores/IStoresRepository"
import { NotFoundError, ConflictError } from "../errors/ServiceError"
import { GeocodingService } from "../geocoding/GeocodingService"
import { cleanCNPJ } from "../../utils/cnpjValidation"

interface UpdateStoreRequest {
  id: string
  name?: string
  cnpj?: string
  state?: string
  city?: string
  address?: string
}

export class UpdateStoreService {
  constructor(
    private storesRepository: IStoresRepository,
    private geocodingService: GeocodingService
  ) {}

  async execute(data: UpdateStoreRequest): Promise<Store> {
    const { id, name, cnpj, state, city, address } = data

    const existingStore = await this.storesRepository.findById(id)
    if (!existingStore) {
      throw new NotFoundError("Loja não encontrada")
    }

    if (cnpj !== undefined) {
      const cleanCnpj = cleanCNPJ(cnpj)
      if (cleanCnpj !== existingStore.cnpj) {
        const storeWithSameCnpj = await this.storesRepository.findByCnpj(cleanCnpj)
        if (storeWithSameCnpj) {
          throw new ConflictError("Já existe uma loja cadastrada com este CNPJ")
        }
      }
    }

    let coordinates = null
    const needsGeocoding = address || city || state

    if (needsGeocoding) {
      const finalAddress = address?.trim() || existingStore.address
      const finalCity = city?.trim() || existingStore.city
      const finalState = state?.toUpperCase().trim() || existingStore.state
      
      coordinates = await this.geocodingService.getCoordinates(finalAddress, finalCity, finalState)
    }

    const updateData = {
      ...(name !== undefined && { name: name.trim() }),
      ...(cnpj !== undefined && { cnpj: cleanCNPJ(cnpj) }),
      ...(state !== undefined && { state: state.toUpperCase().trim() }),
      ...(city !== undefined && { city: city.trim() }),
      ...(address !== undefined && { address: address.trim() }),
      ...(coordinates && {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }),
    }

    const result = await this.storesRepository.update(id, updateData)
    
    if (!result) {
      throw new NotFoundError("Loja não encontrada")
    }

    return result
  }
}
