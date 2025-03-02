// Internal Dependencies:
import { IPPIAccountRepository } from '../interfaces/IGetAvailableBalanceRepository';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';

// Get available balance use case:
export class GetAvailableBalanceUseCase {
  private repository: IPPIAccountRepository;

  constructor(repository: IPPIAccountRepository) {
    this.repository = repository;
  }

  async execute(): Promise<AccountBalanceResponsePPI[]> {
    return await this.repository.getAvailableBalance();
  }
}
