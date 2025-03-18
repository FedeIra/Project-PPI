// External Dependencies:
import { APIGatewayEvent } from 'aws-lambda';

// Internal Dependencies:
import { GetAvailableBalanceController } from './infrastructure/controllers/GetAvailableBalanceController';
import { PPIAccountRepository } from './infrastructure/repositories/PPIAccountRepository';

// All handlers:
const accountRepository = new PPIAccountRepository();
const getAvailableBalanceController = new GetAvailableBalanceController(
  accountRepository
);

export const getAvailableBalance = async (event: APIGatewayEvent) => {
  return getAvailableBalanceController.handle(event);
};
