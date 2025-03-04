// Internal Dependencies:
import { buildResponse, ErrorHandler } from '../../utils/ResponseBuilder';
import { GetAvailableBalanceUseCase } from '../../application/usecases/GetAvailableBalanceUseCase';
import { PPIAccountRepository } from '../repositories/PPIAccountRepository';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';
import { logger } from '../../utils/LogBuilder';

// Get available balance controller:
export const GetAvailableBalanceController = {
  handle: async (event: any) => {
    logger.info(
      `GetAvailableBalanceController.handle: Event: ${JSON.stringify(event, null, 2)}`
    );

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

      logger.info(
        `GetAvailableBalanceController.handle: Success: ${JSON.stringify(data, null, 2)}`
      );

      logger.info('GetAvailableBalanceController.handle: Success', { data });

      logger.info({
        msg: 'GetAvailableBalanceController.handle: Success',
        balance: JSON.stringify(data, null, 2),
      });

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
  },
};
