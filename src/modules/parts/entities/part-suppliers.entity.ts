import { SupplierPartEntity } from './supplier-parts.entity.js';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'part_suppliers',
})
export class PartSupplierEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
    primaryKeyConstraintName: 'pk_part_suppliers',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  @Index('idx_part_suppliers_name')
  name: string;

  @Column({
    name: 'delivery_time',
    type: 'integer',
  })
  deliveryTime: number;

  @OneToMany('SupplierPartEntity', 'supplier', { nullable: true })
  supplierParts: SupplierPartEntity[] | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
