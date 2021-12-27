import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { made_http_exception_obj } from 'src/utils/checkParam';
import { Connection, getRepository, Repository } from 'typeorm';
import { UsersEntity, PhotoEntity } from 'src/entitys';
import { PaginatedDto } from 'src/common/classes/responseType';
import { AlbumResponseDto } from './constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly UsersRepository: Repository<UsersEntity>,
    @InjectRepository(PhotoEntity)
    private readonly PhotoRepository: Repository<PhotoEntity>,
    private connection: Connection,
  ) {}

  /**
   * 获取所有用户
   * @returns
   */
  async getAllUsers() {
    // relations: ['photos'] 联合查询
    const u = await this.UsersRepository.find({ relations: ['photos'] });
    return {
      total: 100,
      limit: 10,
      offset: 0,
      results: u,
    };
  }

  async findOne(username) {
    return await this.UsersRepository.findOne({ username });
  }

  /**
   * 创建单个用户
   * @param user
   * @returns
   */
  async createUser(user): Promise<UsersEntity[]> {
    const { username } = user;
    const u = await getRepository(UsersEntity).find({ where: { username } });
    if (u.length > 0) {
      made_http_exception_obj('用户已存在', 'username has exist');
    }
    return await this.UsersRepository.save(user);
  }

  /**
   * 批量创建用户
   * @param users
   */
  async createManyUser(users) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      users.forEach(async (user) => {
        await queryRunner.manager.getRepository(UsersEntity).save(user);
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      // 错误回滚代码
      await queryRunner.rollbackTransaction();
    } finally {
      // 释放queryRunner
      await queryRunner.release();
    }
  }

  //获取上传的所有用户照片
  async getAll(): Promise<PaginatedDto<AlbumResponseDto>> {
    const items = await this.PhotoRepository.find();
    return {
      total: items.length,
      limit: 10,
      offset: 0,
      results: items,
    };
  }

  // 上传用户相片
  upload(fileUrl: string, userId: number) {
    this.PhotoRepository.save({
      url: fileUrl,
      userId,
    });
  }

  //删除相片
  async deleteUserAblum(id: number) {
    const item = await this.PhotoRepository.delete(id);
    return item;
  }
}
