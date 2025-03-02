// Internal Dependencies:
import { buildResponse } from '../../utils/ResponseBuilder';
import { GetAvailableBalanceUseCase } from '../../application/usecases/GetAvailableBalanceUseCase';
import { PPIAccountRepository } from '../repositories/PPIAccountRepository';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';

// Get available balance controller:
export const GetAvailableBalanceController = {
  handle: async (event: any) => {
    const accountRepository = new PPIAccountRepository();
    const getAvailableBalanceUseCase = new GetAvailableBalanceUseCase(
      accountRepository
    );

    try {
      // Get PPI account balance:
      const data: AccountBalanceResponsePPI[] =
        await getAvailableBalanceUseCase.execute();

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
      return buildResponse({
        status: 'error',
        codeStatus: 500,
        errorMessage: `Internal error: ${error}`,
      });
    }
  },
};
