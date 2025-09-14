import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1757839456812 implements MigrationInterface {
    name = 'Migrations1757839456812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."idx_supplier_parts_main_part_id_supplier_id"
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "idx_supplier_parts_main_part_id_supplier_id" ON "supplier_parts" ("main_part_id", "supplier_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."idx_supplier_parts_main_part_id_supplier_id"
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_supplier_parts_main_part_id_supplier_id" ON "supplier_parts" ("main_part_id", "supplier_id")
        `);
    }

}
