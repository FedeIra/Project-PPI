// External Dependencies:
import { APIGatewayEvent } from 'aws-lambda';

// Internal Dependencies:
import { buildResponse, ErrorHandler } from '../../utils/ResponseBuilder';
import { GetAvailableBalanceUseCase } from '../../application/usecases/GetAvailableBalanceUseCase';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';
import { IPPIAccountRepository } from '../../application/interfaces/IGetAvailableBalanceRepository';

// Get available balance controller:
export class GetAvailableBalanceController {
  private getAvailableBalanceUseCase: GetAvailableBalanceUseCase;

  constructor(accountRepository: IPPIAccountRepository) {
    this.getAvailableBalanceUseCase = new GetAvailableBalanceUseCase(
      accountRepository
    );
  }

  async handle(event: APIGatewayEvent) {
    try {
      // Get PPI account balance:
      const data: AccountBalanceResponsePPI[] =
        await this.getAvailableBalanceUseCase.execute();

      // If no results:
      if (!data.length) {
        return buildResponse({ status: 'success', codeStatus: 200, data: [] });
      }

      // Filter positive balances:
      const balance: AccountBalanceResponsePPI[] = data.filter(
        (balance) => balance.amount > 0
      );

      return buildResponse({
        status: 'success',
        codeStatus: 200,
        data: balance,
      });
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }
}
