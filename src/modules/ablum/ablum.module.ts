import { Module } from '@nestjs/common';
import { AblumService } from './ablum.service';
import { AblumController } from './ablum.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from 'src/entitys/photo.entity';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PhotoEntity]),
  ],
  providers: [AblumService],
  controllers: [AblumController],
})
export class AblumModule {}
