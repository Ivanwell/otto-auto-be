import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { PartManufacturerEntity } from '../entities/part-manufacturers.entity.js';

@Injectable()
export class PartManufacturerRepository extends Repository<PartManufacturerEntity> {
  private readonly logger = new Logger(PartManufacturerRepository.name);
  constructor(manager: EntityManager) {
    super(PartManufacturerEntity, manager);
  }

  async getBrandByName(name: string): Promise<PartManufacturerEntity | null> {
    return this.findOne({
      where: { name },
    });
  }

  async getOrCreateBrandByName(name: string): Promise<PartManufacturerEntity> {
    let manufacturer = await this.findOne({
      where: { name },
    });

    if (!manufacturer) {
      this.logger.debug(`❌ There is no manufacturer for brand ${name}`);

      manufacturer = new PartManufacturerEntity();
      manufacturer.name = name;
      await this.save(manufacturer);
      this.logger.debug(`✅ Created manufacturer with id ${manufacturer.id}`);
    }

    return manufacturer;
  }
}
