import { SupplierPartDto } from './supplier-part.dto.js';
import { MainPartEntity } from '../entities/main-parts.entity.js';

export class OnePartDto {
  title: string;
  article: string;
  manufacturer: string;
  supplierParts: SupplierPartDto[];

  static of(mainPart: MainPartEntity) {
    const p = new OnePartDto();
    p.title = mainPart.title;
    p.article = mainPart.article;
    p.manufacturer = mainPart.manufacturer.name;
    p.supplierParts = mainPart.supplierParts.map((supplierPart) => {
      return SupplierPartDto.of(supplierPart);
    });

    return p;
  }
}
