import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { made_http_exception_obj } from 'src/utils/checkParam';
import { Connection, getRepository, Repository } from 'typeorm';
import { UsersEntity } from 'src/entitys/users.entity';
import { createUserProperty } from './classes/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly UsersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {}

  async getAllUsers() {
    // relations: ['photos'] 联合查询
    const u = await this.UsersRepository.find({ relations: ['photos'] });
    return u;
  }

  async createUser(user): Promise<UsersEntity[]> {
    const { username } = user;
    const u = await getRepository(UsersEntity).find({ where: { username } });
    if (u.length > 0) {
      made_http_exception_obj({
        httpStatus: HttpStatus.BAD_REQUEST,
        message: 'username must be unique',
        error: 'USER_HAS_ALEXIST',
      });
    }
    return await this.UsersRepository.save(user);
  }

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
}
