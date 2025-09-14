import process from 'process';
import url from 'url';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const rootDir = __dirname.includes('/dist/')
  ? path.resolve(__dirname, '../../../') // from dist/src/config to project root
  : path.resolve(__dirname, '../../');

const envFilePath = [
  path.join(rootDir, `.env.${process.env.NODE_ENV}.local`),
  path.join(rootDir, `.env.${process.env.NODE_ENV}`),
  path.join(rootDir, `.env.local`),
  path.join(rootDir, `.env`),
];

console.log(__dirname);

export const ConfigModuleConfig = ConfigModule.forRoot({
  envFilePath: envFilePath,
  isGlobal: true,
  validatePredefined: process.env.NODE_ENV === 'test',
});
