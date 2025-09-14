import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm-config.service.js';
import { ConfigModuleConfig } from './config-module.config.js';

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  inject: [ConfigService],
});
