// Internal Dependencies:
import { GetAvailableBalanceController } from './infrastructure/controllers/GetAvailableBalanceController';

// All handlers:
export const getAvailableBalance = (event: any) => {
  return GetAvailableBalanceController.handle(event);
};
