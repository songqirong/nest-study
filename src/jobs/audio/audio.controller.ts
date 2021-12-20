import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';

@ApiTags('音频相关')
@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add(
      'transcode',
      {
        file: 'audio.mp3',
      },
      {
        delay: 1000,
      },
    );
  }
}
