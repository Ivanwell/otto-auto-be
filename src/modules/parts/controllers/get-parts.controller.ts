import { Controller, Get } from '@nestjs/common';
import { PartsService } from '../services/get-parts.service.js';
import { MainPartEntity } from '../entities/main-parts.entity.js';

@Controller('/test')
export class GetPartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  getHello(): Promise<MainPartEntity | null> {
    return this.partsService.getParts();
  }
}
