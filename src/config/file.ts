/**
 * 文件上传
 */

import { join } from 'path';
import { diskStorage } from 'multer';
import { MulterModuleOptions } from '@nestjs/platform-express/multer/interfaces/files-upload-module.interface';
import { Request } from 'express';
import { mkdir } from 'fs';

const fileConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: (req: Request, file, cb) => {
      const path = join(
        __dirname,
        req.params.type === 'build'
          ? '../static/build/ssl'
          : `../static/${req.query.project ?? 'common'}/${req.params.type}`,
      );
      // 由于赋予destination函数，所以需自行循环创建目录，然后再通过cb去返回目录
      mkdir(path, { recursive: true }, () => {
        cb(null, path);
      });
    },

    filename: (req, file, cb) => {
      const filename = `${new Date().getTime()}.${file.mimetype.split('/')[1]}`;
      return cb(null, filename);
    },
  }),
};
export default fileConfig;
