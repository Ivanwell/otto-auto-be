import { Controller, Get, Param } from '@nestjs/common';
import { PartsService } from '../services/get-parts.service.js';
import { OnePartDto } from '../dto/one-part.dto.js';
import { PartRequest } from '../dto/request/part.request.js';

@Controller()
export class GetPartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get('/api/1.0/part/:article')
  async getOnePart(@Param() params: PartRequest): Promise<OnePartDto> {
    const part = await this.partsService.getPartByArticle(params.article);
    return OnePartDto.of(part);
  }
}
