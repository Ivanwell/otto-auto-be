import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1757846993195 implements MigrationInterface {
  name = 'Migrations1757846993195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "part_suppliers" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "delivery_time" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "pk_part_suppliers" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "idx_part_suppliers_name" ON "part_suppliers" ("name")
        `);
    await queryRunner.query(`
            ALTER TABLE "supplier_parts"
            ADD CONSTRAINT "fk_part_supplier_supplier_id" FOREIGN KEY ("supplier_id") REFERENCES "part_suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);

    await queryRunner.query(`
            INSERT INTO "part_suppliers"
            (name, delivery_time) 
            VALUES('Tehnomir', 1);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "supplier_parts" DROP CONSTRAINT "fk_part_supplier_supplier_id"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."idx_part_suppliers_name"
        `);
    await queryRunner.query(`
            DROP TABLE "part_suppliers"
        `);
  }
}
