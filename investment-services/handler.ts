import { GetInvestingProfileController } from './infrastructure/controllers/InvestingProfileController';

export const getInvestmentProfile = async (event: any) => {
  return await GetInvestingProfileController.handle(event);
};
