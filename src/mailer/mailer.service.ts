import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    const config = {
      host: this.configService.get('mail.host'),
      port: this.configService.get('mail.port'),
      secure: this.configService.get('mail.secure'),
      auth: {},
    };
    if (this.configService.get('env') !== 'develoment') {
      config.auth = {
        user: this.configService.get('mail.user'),
        pass: this.configService.get('pass'),
      };
    }
    this.transporter = nodemailer.createTransport(config);
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOption = {
      from: 'musicmaket-no-reply@test.local',
      to,
      subject,
      text,
    };

    try {
      const result = await this.transporter.sendMail(mailOption);
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
