import { Module } from '@nestjs/common';
import { AblumService } from './ablum.service';
import { AblumController } from './ablum.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
  ],
  providers: [AblumService],
  controllers: [AblumController],
})
export class AblumModule {}
