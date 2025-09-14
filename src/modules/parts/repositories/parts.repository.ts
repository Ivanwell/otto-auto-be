import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { MainPartEntity } from '../entities/main-parts.entity.js';

@Injectable()
export class MainPartRepository extends Repository<MainPartEntity> {
  constructor(manager: EntityManager) {
    super(MainPartEntity, manager);
  }

  async getPartByArticleWithSuppliers(
    article: string,
  ): Promise<MainPartEntity | null> {
    return this.findOne({
      where: { article },
      relations: ['supplierParts', 'manufacturer'],
    });
  }
}
