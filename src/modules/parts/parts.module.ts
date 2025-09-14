import { Module } from '@nestjs/common';
import { GetPartsController } from './controllers/get-parts.controller.js';
import { PartsService } from './services/get-parts.service.js';
import { MainPartRepository } from './repositories/parts.repository.js';
import { PartManufacturerRepository } from './repositories/manufacturers.repository.js';
import { HttpModule } from '@nestjs/axios';
import { SyncPartsService } from './services/sync-parts.service.js';
import { SupplierPartRepository } from './repositories/supplier-part.repository.js';

@Module({
  imports: [HttpModule],
  controllers: [GetPartsController],
  providers: [
    // services
    PartsService,
    SyncPartsService,
    // repositories
    MainPartRepository,
    PartManufacturerRepository,
    SupplierPartRepository,
  ],
})
export class PartsModule {}
