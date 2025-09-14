import { Module } from '@nestjs/common';
import { GetStockController } from '../tehnomir/controllers/get-stock.controller.js';
import { TechnomirApiService } from '../tehnomir/services/techomir-api.service.js';
import { PartsModule } from '../../parts/parts.module.js';
import { HttpModule } from '@nestjs/axios';
import { SyncPartsService } from '../../parts/services/sync-parts.service.js';

@Module({
  imports: [HttpModule, PartsModule],
  controllers: [GetStockController],
  providers: [TechnomirApiService, SyncPartsService],
  exports: [TechnomirApiService],
})
export class TechnomirModule {}
