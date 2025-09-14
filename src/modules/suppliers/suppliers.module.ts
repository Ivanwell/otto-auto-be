import { Module } from '@nestjs/common';
import { TechnomirModule } from './tehnomir/technomir.module.js';
import { PartsModule } from '../parts/parts.module.js';

@Module({
  imports: [TechnomirModule, PartsModule],
  exports: [TechnomirModule],
})
export class PartSuppliersModule {}
