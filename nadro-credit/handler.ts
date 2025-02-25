import { SendEmailNotificationController } from './infrastructure/controllers/SendEmailNotificationController';

export const SendEmailNotification = async (event: any) => {
  console.log('SendEmailNotification');
  return await SendEmailNotificationController.handle(event);
};
