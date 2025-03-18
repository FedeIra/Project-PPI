// Internal Dependencies:
import { IPPIAccountRepository } from '../interfaces/IGetAvailableBalanceRepository';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';

// Get available balance use case:
export class GetAvailableBalanceUseCase {
  constructor(private repository: IPPIAccountRepository) {}

  execute(): Promise<AccountBalanceResponsePPI[]> {
    return this.repository.getAvailableBalance();
  }
}
