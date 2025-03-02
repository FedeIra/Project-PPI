import { ISendEmailNotificationRepository } from '../interfaces/ISendEmailNotificationRepository';
import { SendEmailNotificationRepository } from '../../infrastructure/persistence/SendEmailNotificationRepository';

export const SendEmailNotificationUseCase = {
  execute: async (
    type: 'REQUEST' | 'APPROVAL',
    emailSource: string,
    emailDestinations: string[]
  ) => {
    const repository: ISendEmailNotificationRepository =
      new SendEmailNotificationRepository();
    return await repository.sendEmail(type, emailSource, emailDestinations);
  },
};
