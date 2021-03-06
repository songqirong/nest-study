import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerMiddlewareFun } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { join } from 'path';
import { Request, static as express_static } from 'express';
import {
  CorsOptions,
  CorsOptionsCallback,
} from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置swagger文档相关设置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document') // 设置标题
    .setDescription('nest starter project api document') // 设置描述信息
    .setVersion('2.0') // 设置版本号
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document, {
    customSiteTitle: '前端接口文档',
    swaggerOptions: {
      docExpansion: 'none',
      explorer: true,
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        active: true,
        theme: 'tomorrow-night',
      },
    },
  });

  // 访问内部资源
  app.use('/static', express_static(join(__dirname, 'static')));
  // 全局中间件
  app.use(LoggerMiddlewareFun);
  //全局管道
  // app.useGlobalPipes(new ParseBoolPipe({  }));
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors((req: Request, cb: CorsOptionsCallback) => {
    const configOptions: CorsOptions = {
      origin: req.headers.origin || '*',
      credentials: true,
      allowedHeaders: ['X-Requested-With', 'Authorization', 'Content-Type'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    };
    cb(null, configOptions);
  });

  await app.listen(8099);
}
bootstrap();
