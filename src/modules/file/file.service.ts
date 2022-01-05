import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tar } from 'compressing';
import { PaginatedDto } from 'src/common/classes/responseType';
import { FileEntity } from 'src/entitys';
import { filterFindObj } from 'src/utils/base';
import { check_param_contact } from 'src/utils/checkParam';
import { Between, Repository } from 'typeorm';
import { getAllFileResDto, IDownObj, IGetFile, ISaveFile } from './constants';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

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

  /**
   * 存储文件
   * @param obj
   */
  async saveFile(obj: ISaveFile) {
    await this.fileRepository.save(obj);
  }

  /**
   * 获取文件基本信息
   * @param obj
   * @returns
   */
  async getAllFiles(obj: IGetFile): Promise<PaginatedDto<getAllFileResDto>> {
    const {
      date_from,
      date_to,
      id,
      url,
      project,
      fileType,
      limit = 10,
      page = 1,
    } = obj;
    // 两参数是并联关系，要嘛都有，要嘛都没有
    check_param_contact({ date_from, date_to });
    const offset = (page - 1) * limit;
    const whereObj =
      date_from && date_to
        ? {
            date: Between(date_from, date_to),
            ...filterFindObj({ id, project, url, fileType }),
          }
        : filterFindObj({ id, project, url, fileType });
    const items = await this.fileRepository
      .createQueryBuilder('files')
      .andWhere(whereObj)
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
    return {
      results: items[0],
      total: items[1],
      offset: (page - 1) * limit,
      limit,
    };
  }
}
