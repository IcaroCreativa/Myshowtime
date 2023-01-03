import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { mailerConfig } from './mailer-config';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = createTransport(mailerConfig);
  }

  async sendEmail(to: string, subject: string, body: string) {
    const message = {
      from: 'cliiki@=.projet@gmail.com ',
      to:'antonioperezseron@gmail.com',
      subject: 'test',
      text: 'Body du mail',
    };
    return this.transporter.sendMail(message);
  }
}