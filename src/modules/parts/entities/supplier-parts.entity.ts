import { MainPartEntity } from './main-parts.entity.js';
import { PartSupplierEntity } from './part-suppliers.entity.js';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'supplier_parts',
})
@Index(
  'idx_supplier_parts_main_part_id_supplier_id',
  ['mainPartId', 'supplierId'],
  { unique: true },
)
export class SupplierPartEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
    primaryKeyConstraintName: 'pk_supplier_parts',
  })
  @Index('idx_supplier_parts_id')
  id: number;

  @Column({
    name: 'main_part_id',
    type: 'integer',
  })
  mainPartId: number;

  @ManyToOne(() => MainPartEntity, (mainPart) => mainPart.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'main_part_id',
    foreignKeyConstraintName: 'fk_supplier_parts_main_part_id',
  })
  mainPart: MainPartEntity;

  @Column({
    name: 'amount',
    type: 'integer',
  })
  amount: number;

  @Column({
    name: 'price',
  })
  price: number;

  @Column({
    name: 'supplier_id',
    type: 'integer',
  })
  supplierId: number;

  @ManyToOne(() => PartSupplierEntity, (partSupplier) => partSupplier.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'supplier_id',
    foreignKeyConstraintName: 'fk_part_supplier_supplier_id',
  })
  supplier: PartSupplierEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
