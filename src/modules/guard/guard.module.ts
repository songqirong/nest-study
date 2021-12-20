import { Module } from '@nestjs/common';
import { GuardController } from './guard.controller';
import { GuardService } from './guard.service';

@Module({
  imports: [],
  controllers: [GuardController],
  providers: [GuardService],
})
export class GuardModule {}
