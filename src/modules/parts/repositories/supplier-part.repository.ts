import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { SupplierPartEntity } from '../entities/supplier-parts.entity.js';

@Injectable()
export class SupplierPartRepository extends Repository<SupplierPartEntity> {
  private readonly logger = new Logger(SupplierPartRepository.name);
  constructor(manager: EntityManager) {
    super(SupplierPartEntity, manager);
  }

  async getPartByMainPartIdAndSupplierId(
    mainPartId: number,
    supplierId: number,
  ): Promise<SupplierPartEntity | null> {
    return this.findOne({
      where: { mainPartId, supplierId },
    });
  }

  async createOrUpdatePartByMainPartIdAndSupplierId(
    mainPartId: number,
    supplierId: number,
    article: string,
    amount: number,
    price: number,
    usdToUah: number,
  ): Promise<SupplierPartEntity | null> {
    let supplierPartFromDb = await this.getPartByMainPartIdAndSupplierId(
      mainPartId,
      supplierId,
    );

    if (!supplierPartFromDb) {
      this.logger.debug(
        `❌ There is no supplier part for ${article}. Creating...`,
      );
      supplierPartFromDb = new SupplierPartEntity();
      supplierPartFromDb.mainPartId = mainPartId;
      supplierPartFromDb.supplierId = supplierId;
    } else {
      this.logger.debug(
        `✅ There is supplier part for ${article}, updating price and amount`,
      );
    }

    supplierPartFromDb.amount = amount;
    supplierPartFromDb.price = Number(price) * usdToUah;

    await this.save(supplierPartFromDb);

    return supplierPartFromDb;
  }
}
