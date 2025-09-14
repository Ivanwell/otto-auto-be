import { Module } from '@nestjs/common';
import { GetPartsController } from './controllers/get-parts.controller.js';
import { PartsService } from './services/get-parts.service.js';
import { MainPartRepository } from './repositories/parts.repository.js';

@Module({
  imports: [],
  controllers: [GetPartsController],
  providers: [PartsService, MainPartRepository],
})
export class PartsModule {}
