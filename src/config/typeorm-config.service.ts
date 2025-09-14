import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { CustomNamingStrategy } from '../utils/typeorm/custom-naming.strategy.js';
import entities from './typeorm/entities.js';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger: Logger = new Logger(TypeOrmConfigService.name);

  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbHost = this.config.get('DB_HOST');
    console.log('this.config.get', dbHost);
    return {
      type: 'postgres',
      host: dbHost,
      port: Number(this.config.get('DB_PORT', '5432')),
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_NAME'),
      applicationName: 'OttoAuto Backend (' + dbHost + ')',
      entities,
      synchronize: false,
      dropSchema: false,
      useUTC: true,
      ssl: true,
      poolSize: 50,
      migrationsRun: false,
      connectTimeoutMS: 60_000,
      namingStrategy: new CustomNamingStrategy(),
      poolErrorHandler: (err) => {
        this.logger.error(
          'Error database pool',
          {
            stack: err instanceof Error ? err.stack : undefined,
            error: !(err instanceof Error) ? err : undefined,
            ping: true,
          },
          TypeOrmConfigService.name,
        );
      },
    } as PostgresConnectionOptions;
  }
}
