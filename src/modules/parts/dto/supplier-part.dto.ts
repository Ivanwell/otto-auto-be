import { SupplierPartEntity } from '../entities/supplier-parts.entity.js';

export class SupplierPartDto {
  amount: number;
  price: number;
  supplier: string;

  static of(supplierPart: SupplierPartEntity) {
    const p = new SupplierPartDto();
    p.amount = supplierPart.amount;
    p.price = supplierPart.price;
    p.supplier = supplierPart.supplier.name;

    return p;
  }
}
