import { Injectable } from '@nestjs/common';
import { MainPartRepository } from '../repositories/parts.repository.js';
import { MainPartEntity } from '../entities/main-parts.entity.js';

@Injectable()
export class PartsService {
  constructor(private readonly mainPartRepository: MainPartRepository) {}
  async getParts(): Promise<MainPartEntity | null> {
    return await this.mainPartRepository.getPartsWithSuppliers();
  }
}
