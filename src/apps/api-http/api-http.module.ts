import { Module } from '@nestjs/common';
import { PartsModule } from '../../modules/parts/parts.module.js';
import { TypeOrmModuleConfig } from '../../config/typeorm-module.config.js';
import { ConfigModuleConfig } from '../../config/config-module.config.js';

@Module({
  imports: [ConfigModuleConfig, PartsModule, TypeOrmModuleConfig],
})
export class ApiHttpModule {}
