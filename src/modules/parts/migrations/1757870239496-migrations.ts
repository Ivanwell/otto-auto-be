import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1757870239496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "supplier_parts"
      ALTER COLUMN "price" TYPE numeric(12,2) USING "price"::numeric;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "supplier_parts"
      ALTER COLUMN "price" TYPE integer USING ROUND("price");
    `);
  }
}
