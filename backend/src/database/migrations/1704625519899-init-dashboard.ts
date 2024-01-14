import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDashboard1704625519899 implements MigrationInterface {
    name = 'InitDashboard1704625519899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dashboards" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "PK_1b4b4bc346118e0d335f16c5344" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dashboards"`);
    }

}
