import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1757786752991 implements MigrationInterface {
    name = 'Migrations1757786752991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "supplier_parts" (
                "id" SERIAL NOT NULL,
                "main_part_id" integer NOT NULL,
                "amount" integer NOT NULL,
                "price" integer NOT NULL,
                "supplier_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "pk_supplier_parts" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_supplier_parts_id" ON "supplier_parts" ("id")
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_supplier_parts_main_part_id_supplier_id" ON "supplier_parts" ("main_part_id", "supplier_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "supplier_parts"
            ADD CONSTRAINT "fk_supplier_parts_main_part_id" FOREIGN KEY ("main_part_id") REFERENCES "main_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "supplier_parts" DROP CONSTRAINT "fk_supplier_parts_main_part_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."idx_supplier_parts_main_part_id_supplier_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."idx_supplier_parts_id"
        `);
        await queryRunner.query(`
            DROP TABLE "supplier_parts"
        `);
    }

}
