import { buildResponse } from '../utils/ResponseBuilder';
import { SendEmailNotificationUseCase } from '../../application/usecases/SendEmailNotificationUseCase';

export const SendEmailNotificationController = {
  handle: async (event: any) => {
    try {
      // 1) Get parameters for service:
      const { nadroCode, countryISO } = event.queryStringParameters || {};
      const templateRequestUrl = process.env.TEMPLATE_EMAIL_REQUEST;
      const templateApprovedUrl = process.env.TEMPLATE_EMAIL_APPROVED;
      const emailSource = process.env.SES_EMAIL_SOURCE;
      const emailDestinations: string[] = process.env.SES_EMAIL_DESTINATION
        ? process.env.SES_EMAIL_DESTINATION.split(',')
        : [];

      // 2) Initial validations for service required parameters:
      if (!nadroCode || !countryISO) {
        return buildResponse({
          status: 'error',
          codeStatus: 400,
          errorMessage: 'Missing parameters nadroCode or countryISO',
        });
      }

      if (!templateRequestUrl || !templateApprovedUrl) {
        return buildResponse({
          status: 'error',
          codeStatus: 500,
          errorMessage: 'Missing email template URLs in environment variables',
        });
      }

      if (
        !emailSource ||
        !emailDestinations ||
        emailDestinations.length === 0
      ) {
        return buildResponse({
          status: 'error',
          codeStatus: 500,
          errorMessage:
            'Missing email source or destination in environment variables.',
        });
      }

      // 7) Send request and approval email notifications:
      const [resultRequest, resultApproval] = await Promise.all([
        SendEmailNotificationUseCase.execute(
          'REQUEST',
          emailSource,
          emailDestinations
        ),
        SendEmailNotificationUseCase.execute(
          'APPROVAL',
          emailSource,
          emailDestinations
        ),
      ]);

      // 8) Validate results of email notifications:
      if (!resultRequest || !resultApproval) {
        return buildResponse({
          status: 'error',
          codeStatus: 500,
          errorMessage:
            'Error sending email request and/or approval notifications with SES AWS.',
        });
      }

      return buildResponse({
        status: 'success',
        codeStatus: 200,
        data: {
          requestEmail: resultRequest,
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
