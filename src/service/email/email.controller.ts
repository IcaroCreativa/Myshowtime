import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-email')
  async sendEmail(to: string, subject: string, body: string) {
    return this.mailerService.sendEmail(to, subject, body);
  }
}