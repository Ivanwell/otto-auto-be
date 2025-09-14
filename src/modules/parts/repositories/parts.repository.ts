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
      relations: ['supplierParts', 'supplierParts.supplier', 'manufacturer'],
    });
  }

  async getMainPartByArticleAndBrand(
    article: string,
  ): Promise<MainPartEntity | null> {
    return this.findOne({
      where: { article },
      relations: ['manufacturer'],
    });
  }

  async createMainPartEntity(
    article: string,
    title: string,
    manufacturerId: number,
  ): Promise<MainPartEntity> {
    let mainPartFromDb = new MainPartEntity();
    mainPartFromDb.article = article.trim();
    mainPartFromDb.title = title;
    mainPartFromDb.manufacturerId = manufacturerId;

    await this.save(mainPartFromDb);

    return mainPartFromDb;
  }
}
