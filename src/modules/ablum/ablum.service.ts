import { Injectable } from '@nestjs/common';
import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class AblumService {
  constructor(private readonly configService: ConfigService) {}
  upload(file) {
    console.log(file);
  }

  async downloadAll() {
    const uploadDir = this.configService.get('file').dest;
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: 'ablum.tar', tarStream };
  }
}
