import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'part_manufacturers',
})
export class PartManufacturerEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
    primaryKeyConstraintName: 'pk_part_manufacturers',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  @Index('idx_manufacturers_name')
  name: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  country: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
