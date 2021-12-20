import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { Photo } from 'src/modules/users/classes/users';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column('varchar')
  password: string;

  @Column()
  status: boolean;

  @OneToMany(() => PhotoEntity, (photo) => photo.userId)
  photos: Photo[];
}
