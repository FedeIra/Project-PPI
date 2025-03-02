import AWS from 'aws-sdk';
import { ISendEmailNotificationRepository } from '../../application/interfaces/ISendEmailNotificationRepository';
import { CustomerDocsType } from '../../domain/types/CustomerDocs.type';
import { CustomerFormType } from '../../domain/types/CustomerForm.type';

export class SendEmailNotificationRepository
  implements ISendEmailNotificationRepository
{
  private ses;

  constructor() {
    this.ses = new AWS.SES({ region: 'us-east-1' });
  }

  async sendEmail(
    type: 'REQUEST' | 'APPROVAL',
    emailSource: string,
    emailDestinations: string[]
  ): Promise<any> {
    // 1) Verify email source:
    const emailVerification: boolean = await this.verifyEmail(emailSource);

    if (!emailVerification) {
      throw new Error('Email not verified in SES AWS');
    }

    const params = {
      Destination: { ToAddresses: emailDestinations },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'hola',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data:
            type === 'REQUEST'
              ? 'Solicitud de Crédito - Nadro'
              : 'Aprobación de Crédito - Nadro',
        },
      },
      Source: emailSource,
    };

    try {
      const response = await this.ses.sendEmail(params).promise();
      return response;
    } catch (error) {
      throw new Error(`Email sending SES AWS failed: ${error}`);
    }
  }

  // Private helper to verify email in SES AWS:
  private async verifyEmail(email: string): Promise<boolean> {
    try {
      const verifiedEmails = await this.ses
        .listIdentities({ IdentityType: 'EmailAddress' })
        .promise();
      return verifiedEmails.Identities.includes(email);
    } catch (error) {
      throw new Error(`Email verification failed: ${error}`);
    }
  }

  // Private helper to complete common fields in email template:
  private completeCommonFields(
    template: string,
    customerForm: CustomerFormType,
    customerDocs: CustomerDocsType
  ): string {
    console.info('CUSTOMER DOCS:', customerDocs);
    const documentMap: Record<string, string> = {
      'Identificacion oficial vigente': 'Identificación oficial vigente',
      'Identificacion oficial vigente del aval':
        'Identificación oficial vigente del aval',
      'Constancia de situación fiscal y/o apertura de establecimiento':
        'Constancia de situación fiscal y/o apertura de establecimiento',
      'Comprobante de domicilio vigente': 'Comprobante de domicilio vigente',
      'Comprobante de domicilio vigente del aval':
        'Comprobante de domicilio vigente del aval',
    };

    let parsedTemplate = template
      .replace('[CLIENTE]', customerForm.Name)
      .replace('[Nombre cliente]', customerForm.Name)
      .replace('[RFC]', customerForm.RFC)
      .replace('[Código]', customerForm.NadroCode)
      .replace('[Sucursal]', customerForm.Branch)
      .replace('[Teléfono]', customerForm.Phone)
      .replace('[Email]', customerForm.Email)
      .replace(
        '[Límite solicitado]',
        customerForm.RequestedCreditLimit.toString()
      );

    Object.entries(documentMap).forEach(([key, label]) => {
      const hasDocument = customerDocs.DocumentsUpdate.includes(key);

      const regex = new RegExp(`${label}\\s*-\\s*<span>(SÍ|NO)<\\/span>`, 'gi');
      parsedTemplate = parsedTemplate.replace(
        regex,
        `${label} - <span>${hasDocument ? 'SÍ' : 'NO'}</span>`
      );
    });

    return parsedTemplate;
  }
}
