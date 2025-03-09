// External Dependencies:
import { APIGatewayEvent } from 'aws-lambda';

// Internal Dependencies:
import { GetAvailableBalanceController } from './infrastructure/controllers/GetAvailableBalanceController';

// All handlers:
export const getAvailableBalance = (event: APIGatewayEvent) => {
  return GetAvailableBalanceController.handle(event);
};
