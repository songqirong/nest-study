/**
 * 文件上传
 */

import { join } from 'path';
import { diskStorage } from 'multer';
import { MulterModuleOptions } from '@nestjs/platform-express/multer/interfaces/files-upload-module.interface';

const fileConfig: MulterModuleOptions = {
  dest: join(__dirname, '../uploads'),
  storage: diskStorage({
    destination: join(
      __dirname,
      `../uploads/${new Date().toLocaleDateString().replace(/\//gm, '-')}`,
    ),
    filename: (req, file, cb) => {
      const filename = `${new Date().getTime()}.${file.mimetype.split('/')[1]}`;
      return cb(null, filename);
    },
  }),
};
export default fileConfig;
