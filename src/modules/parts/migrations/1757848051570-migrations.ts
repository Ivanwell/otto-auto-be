import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1757848051570 implements MigrationInterface {
    name = 'Migrations1757848051570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "main_parts"
            ADD "image_url" character varying(2040)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "main_parts" DROP COLUMN "image_url"
        `);
    }

}
