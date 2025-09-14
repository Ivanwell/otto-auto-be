import { Logger, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TechnomirPartInterface } from '../../suppliers/tehnomir/interfaces/technomir-part.interface.js';
import { MainPartRepository } from '../repositories/parts.repository.js';
import { PartManufacturerRepository } from '../repositories/manufacturers.repository.js';
import { PartManufacturerEntity } from '../entities/part-manufacturers.entity.js';
import { SupplierPartRepository } from '../repositories/supplier-part.repository.js';

@Injectable()
export class SyncPartsService {
  private readonly logger = new Logger(SyncPartsService.name);

  constructor(private readonly entityManager: EntityManager) {}

  async syncTechnomirParts(
    parts: TechnomirPartInterface[],
    usdToUah: number,
    supplierId: number,
  ) {
    this.logger.debug(`💸 Currency UAH to USD ${usdToUah}`);
    const mainPartRepo = new MainPartRepository(this.entityManager);
    const partManufacturerRepo = new PartManufacturerRepository(
      this.entityManager,
    );
    const supplierPartRepo = new SupplierPartRepository(this.entityManager);

    for (const part of parts) {
      let mainPartFromDb = await mainPartRepo.getMainPartByArticleAndBrand(
        part.code.trim(),
      );

      if (!mainPartFromDb) {
        this.logger.debug(
          `❌ There is no main part for article ${part.code}, creating...`,
        );

        let manufacturer: PartManufacturerEntity;
        try {
          manufacturer = await partManufacturerRepo.getOrCreateBrandByName(
            part.brand,
          );
        } catch (e) {
          this.logger.debug(`🔴 Failed creating manufacturer`, e);
          continue;
        }

        try {
          mainPartFromDb = await mainPartRepo.createMainPartEntity(
            part.code,
            part.descriptionRus,
            manufacturer.id,
          );

          this.logger.debug(
            `✅ Created main part with id ${mainPartFromDb.id}`,
          );
        } catch (e) {
          this.logger.debug(`🔴 Failed creating main part`, e);
          continue;
        }
      }

      try {
        await supplierPartRepo.createOrUpdatePartByMainPartIdAndSupplierId(
          mainPartFromDb.id,
          supplierId,
          part.code,
          part.quantity,
          part.price,
          usdToUah,
        );
      } catch (e) {
        this.logger.debug(`🔴 Failed creating or updating supplier part`, e);
      }
    }

    this.logger.debug('🎉 Technomir sync completed.');
  }
}
