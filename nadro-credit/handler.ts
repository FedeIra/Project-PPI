import { SendEmailNotificationController } from './infrastructure/controllers/SendEmailNotificationController';

export const login = async (event: any) => {
  return await SendEmailNotificationController.handle(event);
};
