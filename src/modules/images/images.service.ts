import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/classes/responseType';
import { ImageEntity } from 'src/entitys';
import { filterFindObj } from 'src/utils/base';
import { check_param_contact } from 'src/utils/checkParam';
import { Between, Repository } from 'typeorm';
import { getAllImageResDto, IGetImage, ISaveImage } from './constants';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly ImageRepository: Repository<ImageEntity>,
  ) {}

  async getAllImages(obj: IGetImage): Promise<PaginatedDto<getAllImageResDto>> {
    const { date_from, date_to, id, url, project, limit = 10, page = 1 } = obj;
    // 两参数是并联关系，要嘛都有，要嘛都没有
    check_param_contact({ date_from, date_to });
    const offset = (page - 1) * limit;
    const items = await this.ImageRepository.createQueryBuilder('images')
      .andWhere({
        date: Between(date_from, date_to),
        ...filterFindObj({ id, project, url }),
      })
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

  /**
   * 存储图片
   * @param obj
   */
  async saveImage(obj: ISaveImage) {
    await this.ImageRepository.save(obj);
  }
}
