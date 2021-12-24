import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';
import { PhotoEntity } from 'src/entitys/photo.entity';
import { Repository } from 'typeorm';
import { IDownObj } from './classes/upload';

@Injectable()
export class AblumService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  // 上传图片
  upload(fileUrl: string, userId: number) {
    this.photoRepository.save({
      url: fileUrl,
      userId,
    });
  }

  async downloadAll() {
    const uploadDir = `${process.cwd()}/dist/static`;
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: 'static.tar', tarStream };
  }

  async download(Obj: IDownObj) {
    const uploadDir = `${process.cwd()}/dist/static/${Obj.project}/${Obj.type}`;
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: `${Obj.project}-${Obj.type}.tar`, tarStream };
  }
}
