import { Injectable } from '@nestjs/common';
import { tar } from 'compressing';
import { IDownObj } from './classes/upload';

@Injectable()
export class FileService {
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
