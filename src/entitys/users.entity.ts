import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoEntity } from './photos.entity';
import { Photo } from 'src/modules/users/constants';

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
