import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PartManufacturerEntity } from './part-manufacturers.entity.js';
import { SupplierPartEntity } from './supplier-parts.entity.js';

@Entity({
  name: 'main_parts',
})
export class MainPartEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
    primaryKeyConstraintName: 'pk_main_parts',
  })
  id: number;

  @Column({
    name: 'title',
    type: 'text',
  })
  @Index('idx_main_parts_title')
  title: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'article',
    type: 'varchar',
    length: 255,
  })
  @Index('idx_main_parts_article')
  article: string;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 2040,
    nullable: true,
  })
  imageUrl: string;

  @Column({
    name: 'manufacturer_id',
    type: 'integer',
  })
  @Index('idx_main_parts_manufacturer_id')
  manufacturerId: number;

  @ManyToOne(() => PartManufacturerEntity, (manufacturer) => manufacturer.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: false,
  })
  @JoinColumn({
    name: 'manufacturer_id',
    foreignKeyConstraintName: 'fk_main_parts_manufacturer_id',
  })
  manufacturer: PartManufacturerEntity;

  @OneToMany('SupplierPartEntity', 'mainPart')
  supplierParts: SupplierPartEntity[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
