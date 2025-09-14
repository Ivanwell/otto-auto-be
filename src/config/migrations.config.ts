import process from 'process';
import url from 'url';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { CustomNamingStrategy } from '../utils/typeorm/custom-naming.strategy.js';
import entities from './typeorm/entities.js';
import migrations from './typeorm/migrations.js';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const nodeEnv = process.env.NODE_ENV;

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const envPaths = [
  `${__dirname}../../.env`,
  `${__dirname}../../.env.local`,
  `${__dirname}../../.env.${nodeEnv}`,
  `${__dirname}../../.env.${nodeEnv}.local`,
];
dotenv.config({ path: envPaths, override: true });

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  applicationName: 'OttoAuto Migration',
  synchronize: false,
  logging: true,
  namingStrategy: new CustomNamingStrategy(),
  ssl: true,
  entities,
  migrations,
};

export default new DataSource(config);
