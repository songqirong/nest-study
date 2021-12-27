import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'photos' })
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.photos)
  userId: number;

  @Column({ type: 'varchar', length: 80 })
  url: string;
}
