import { SupplierPartEntity } from '../entities/supplier-parts.entity.js';

export class SupplierPartDto {
  amount: number;
  price: number;
  supplierId: number;

  static of(supplierPart: SupplierPartEntity) {
    const p = new SupplierPartDto();
    p.amount = supplierPart.amount;
    p.price = supplierPart.price;
    p.supplierId = supplierPart.supplierId;

    return p;
  }
}
