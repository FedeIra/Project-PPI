export interface ISendEmailNotificationRepository {
  sendEmail(
    type: 'REQUEST' | 'APPROVAL',
    emailSource: string,
    emailDestinations: string[]
  ): Promise<any>;
}
