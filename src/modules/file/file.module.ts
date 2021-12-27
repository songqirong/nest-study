import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { ImagesModule } from '../images/images.module';
import { UsersModule } from '../users/users.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
    UsersModule,
    ImagesModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
