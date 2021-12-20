import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { HelloModule, GuardModule, EmailModule } from 'src/modules';
import { MailerModule } from '@nest-modules/mailer';
import { StatusMonitorModule } from 'nest-status-monitor';
import { statusMonitorConfig } from './config/statusMonitor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PhotoModule } from './modules/photo/photo.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AudioModule } from './jobs/audio/audio.module';
import { AblumModule } from './modules/ablum/ablum.module';
@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*d).{ts,js}')),
    //  链接数据库
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),
    HelloModule,
    GuardModule,
    EmailModule,
    AuthModule,
    UsersModule,
    PhotoModule,
    AudioModule,
    AblumModule,
    // 定时任务
    // ScheduleModule.forRoot(),
    // TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 局部中间件
  // configure(consumer: MiddlewareBuilder) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .exclude({ path: 'hello', method: RequestMethod.POST })
  //     .forRoutes('hello');
  // }
}
