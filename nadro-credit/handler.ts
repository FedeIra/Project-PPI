import { SendEmailNotificationController } from './infrastructure/controllers/SendEmailNotificationController';

export const SendEmailNotification = async (event: any) => {
  return await SendEmailNotificationController.handle(event);
};
