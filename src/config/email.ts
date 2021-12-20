import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerOptions, PugAdapter } from '@nest-modules/mailer';
import { join } from 'path';

const emailConfig: MailerOptions = {
  transport: 'smtps://1776827775@qq.com:qiptrvvkaekedchf@smtp.qq.com',
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  // template: {
  //   dir: join(process.cwd(), './src/templates/emails'),
  //   adapter: new PugAdapter(),
  //   options: {
  //     strict: true,
  //   },
  // },
  template: {
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
};
export default emailConfig;
