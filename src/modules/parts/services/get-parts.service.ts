import { Injectable, NotFoundException } from '@nestjs/common';
import { MainPartRepository } from '../repositories/parts.repository.js';
import { MainPartEntity } from '../entities/main-parts.entity.js';

@Injectable()
export class PartsService {
  constructor(private readonly mainPartRepository: MainPartRepository) {}
  async getPartByArticle(article: string): Promise<MainPartEntity> {
    const part =
      await this.mainPartRepository.getPartByArticleWithSuppliers(article);

    if (!part) {
      throw new NotFoundException(`No part found by article ${article}`);
    }

    return part;
  }
}
