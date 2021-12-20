import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nest-modules/mailer';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(data) {
    try {
      const code = Math.random().toString().slice(-6);
      const date = new Date().getTime();
      const sendMailOptions: ISendMailOptions = {
        to: data.email,
        from: '1776827775@qq.com',
        subject: data.subject || '用户邮箱验证',
        // template: path.join(
        //   process.cwd(),
        //   './src/templates/emails/validate.code.ejs',
        // ),
        template: join(__dirname, '../../templates/emails/validate.code.ejs'),
        context: {
          code,
          date,
          sign: data.sign || '系统邮件，回复无效。',
        },
      };
      this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          console.log(
            `发送邮件给:${data.email},成功!主题:${data.subject || '默认'}`,
          );
        })
        .catch((error) => {
          console.log(
            `发送邮件给:${data.email}出错!主题:${data.subject || '默认'}`,
            error,
          );
        });
      return { code: 200, messgae: '发送邮件成功' };
    } catch (error) {
      console.log('发送邮件出错', error);
      return error.message;
    }
  }
}
