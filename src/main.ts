import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerMiddlewareFun } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ParseBoolPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置swagger文档相关设置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document') // 设置标题
    .setDescription('nest starter project api document') // 设置描述信息
    .setVersion('2.0') // 设置版本号
    .addBearerAuth() // 鉴权
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document, {
    uiConfig: {
      docExpansion: 'none',
    },
  });

  // 全局中间件
  app.use(LoggerMiddlewareFun);

  //全局管道
  // app.useGlobalPipes(new ParseBoolPipe({  }));

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
