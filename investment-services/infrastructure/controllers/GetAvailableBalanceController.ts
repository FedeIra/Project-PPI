// External Dependencies:
import { APIGatewayEvent } from 'aws-lambda';

// Internal Dependencies:
import { buildResponse, ErrorHandler } from '../../utils/ResponseBuilder';
import { GetAvailableBalanceUseCase } from '../../application/usecases/GetAvailableBalanceUseCase';
import { PPIAccountRepository } from '../repositories/PPIAccountRepository';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';
import { IPPIAccountRepository } from '../../application/interfaces/IGetAvailableBalanceRepository';
import { logger } from '../../utils/LogBuilder';

// Get available balance controller:
export class GetAvailableBalanceController {
  private getAvailableBalanceUseCase: GetAvailableBalanceUseCase;

  constructor(accountRepository: IPPIAccountRepository) {
    this.getAvailableBalanceUseCase = new GetAvailableBalanceUseCase(
      accountRepository
    );
  }

  async handle(event: APIGatewayEvent) {
    // Instantiate use cases and repositories:

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
      logger.error('GetAvailableBalanceController.handle: Error occurred:', {
        error,
      });
      return ErrorHandler.handle(error);
    }
  }
}
