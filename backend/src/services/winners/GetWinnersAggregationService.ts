import { IWinnersRepository } from "../../repositories/winners/IWinnersRepository"

interface StateAggregation {
  state: string
  count: number
}

export class GetWinnersAggregationService {
  constructor(private winnersRepository: IWinnersRepository) {}

  async execute(): Promise<StateAggregation[]> {
    const aggregationData = await this.winnersRepository.countByState()
    
    const result = aggregationData.sort((a, b) => b.count - a.count)
    
    return result
  }
}
