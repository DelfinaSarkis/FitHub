import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import * as path from 'path';
dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: process.env.DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
  logging: ['errors'],
  schema: 'public',
  entities: ['dist/*/.entity{.ts,.js}'],
  migrations: [path.join(__dirname, '..', 'dist', 'migration', '*{.ts,.js}')],
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
