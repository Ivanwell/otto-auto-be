import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { MainPartEntity } from '../entities/main-parts.entity.js';

@Injectable()
export class MainPartRepository extends Repository<MainPartEntity> {
  constructor(manager: EntityManager) {
    super(MainPartEntity, manager);
  }

  async getParts(): Promise<MainPartEntity | null> {
    return await this.findOne({
      where: { id: 1 },
      relations: ['partManufacturer'],
    });
  }

  async getPartsWithSuppliers(): Promise<MainPartEntity | null> {
    // const qb = this.createQueryBuilder('mp').innerJoinAndSelect(
    //   'mp.partManufacturer',
    //   'partManufacturer',
    // );
    // qb.andWhere('mp.partManufacturer = :partManufacturer', {
    //   partManufacturer: 1,
    // });

    // qb.leftJoin('supplier_parts', 'sp', 'mp.id = sp.main_part_id')
    //   .addSelect('sp.price', 'price')
    //   .addSelect('sp.amount', 'amount');

    // return qb.getRawMany<MainPartEntity>();

    return this.findOne({
      where: { manufacturerId: 1 },
      relations: ['supplierParts', 'partManufacturer'], // eager load suppliers + manufacturer
    });
  }
}
