import { buildResponse } from '../utils/ResponseBuilder';
import { SendEmailNotificationUseCase } from '../../application/usecases/SendEmailNotificationUseCase';

export const LoginPPIController = {
  handle: async (event: any) => {
    try {
      // 1) Get parameters for service:
      const templateRequestUrl = process.env.TEMPLATE_EMAIL_REQUEST;
      const templateApprovedUrl = process.env.TEMPLATE_EMAIL_APPROVED;
      const emailSource = process.env.SES_EMAIL_SOURCE;
      const emailDestinations: string[] = process.env.SES_EMAIL_DESTINATION
        ? process.env.SES_EMAIL_DESTINATION.split(',')
        : [];

      // 7) Send request and approval email notifications:
      const result = await SendEmailNotificationUseCase.execute({
        templateRequestUrl,
        templateApprovedUrl,
        emailSource,
        emailDestinations,
      });

      return buildResponse({
        status: 'success',
        codeStatus: 200,
        data: {
          requestEmail: result,
        },
      });
    } catch (error) {
      return buildResponse({
        status: 'error',
        codeStatus: 500,
        errorMessage: `Internal error: ${error}`,
      });
    }
  },
};
