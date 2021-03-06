import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { HelloModule, GuardModule, EmailModule } from 'src/modules';
import { MailerModule } from '@nest-modules/mailer';
import { StatusMonitorModule } from 'nest-status-monitor';
import { statusMonitorConfig } from './config/statusMonitor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AudioModule } from './jobs/audio/audio.module';
import { HealthModule } from './modules/health/health.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { FileModule } from './modules/file/file.module';
import { BuildModule } from './modules/build/build.module';
@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*d).{ts,js}')),
    //  链接数据库
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    // 查看接口状态
    StatusMonitorModule.setUp(statusMonitorConfig),

    // 邮件服务
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),
    HelloModule,
    GuardModule,
    EmailModule,
    AuthModule,
    UsersModule,
    AudioModule,
    HealthModule,
    FileModule,
    BuildModule,
    // 定时任务
    // ScheduleModule.forRoot(),
    // TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
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
