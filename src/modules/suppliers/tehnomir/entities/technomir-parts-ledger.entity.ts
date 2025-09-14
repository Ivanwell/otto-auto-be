import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SupplierPartEntity } from '../../../parts/entities/supplier-parts.entity.js';

@Entity({
  name: 'technomir_parts_ledger',
})
export class TechnomirPartsLedgerEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
    primaryKeyConstraintName: 'pk_main_parts',
  })
  id: number;

  @Column({
    name: 'supplier_part_id',
    type: 'integer',
  })
  supplierPartId: number;

  @ManyToOne(() => SupplierPartEntity, (supplierPart) => supplierPart.id)
  @JoinColumn({ name: 'supplier_part_id' })
  supplierPart: SupplierPartEntity;

  @Column({
    name: 'amount_diff',
    type: 'integer',
  })
  amountDiff: number;

  @Column({
    name: 'price_diff',
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  priceDiff: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
