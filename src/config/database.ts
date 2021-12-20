import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const database: ConnectionOptions = {
  type: 'mysql',
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: '123456',
  database: 'nest',
  entities: [join(__dirname, '../', 'entitys/**.entity{.ts,.js}')],
  synchronize: true,
};
export default database;
