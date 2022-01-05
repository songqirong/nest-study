import { IFileType } from 'src/modules/file/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
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

  @Column({ type: 'varchar' })
  fileType: IFileType;
}
