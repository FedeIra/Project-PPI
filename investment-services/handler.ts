// Internal Dependencies:
import { GetAvailableBalanceController } from './infrastructure/controllers/GetAvailableBalanceController';

// All handlers:
export const getAvailableBalance = async (event: any) => {
  return await GetAvailableBalanceController.handle(event);
};
