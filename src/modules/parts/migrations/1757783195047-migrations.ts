import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1757783195047 implements MigrationInterface {
    name = 'Migrations1757783195047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "part_manufacturers" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "country" character varying(255),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "pk_part_manufacturers" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_manufacturers_name" ON "part_manufacturers" ("name")
        `);
        await queryRunner.query(`
            CREATE TABLE "main_parts" (
                "id" SERIAL NOT NULL,
                "title" text NOT NULL,
                "description" text,
                "article" character varying(255) NOT NULL,
                "manufacturer_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "pk_main_parts" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_main_parts_title" ON "main_parts" ("title")
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_main_parts_article" ON "main_parts" ("article")
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_main_parts_manufacturer_id" ON "main_parts" ("manufacturer_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "main_parts"
            ADD CONSTRAINT "fk_main_parts_manufacturer_id" FOREIGN KEY ("manufacturer_id") REFERENCES "part_manufacturers"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "main_parts" DROP CONSTRAINT "fk_main_parts_manufacturer_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."idx_main_parts_manufacturer_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."idx_main_parts_article"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."idx_main_parts_title"
        `);
        await queryRunner.query(`
            DROP TABLE "main_parts"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."idx_manufacturers_name"
        `);
        await queryRunner.query(`
            DROP TABLE "part_manufacturers"
        `);
    }

}
