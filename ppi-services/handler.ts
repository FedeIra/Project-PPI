import { LoginPPIController } from './infrastructure/controllers/PPILoginController';

export const login = async (event: any) => {
  return await LoginPPIController.handle(event);
};
