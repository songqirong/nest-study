import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  url: string;

  @Column({ type: 'date' })
  dateFormat: string;

  @Column({ type: 'varchar' })
  project: string;

  @Column({ type: 'integer' })
  date: number;
}
