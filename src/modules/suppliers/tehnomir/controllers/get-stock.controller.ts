import { Controller, Get, Param } from '@nestjs/common';
import { TechnomirApiService } from '../services/techomir-api.service.js';

@Controller()
export class GetStockController {
  constructor(private readonly technomirApiService: TechnomirApiService) {}

  @Get('/api/1.0/suppliers/technomir')
  async getOnePart() {
    const part = await this.technomirApiService.syncBrands();
    return part;
  }
}
