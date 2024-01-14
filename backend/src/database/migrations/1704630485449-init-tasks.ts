import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTasks1704630485449 implements MigrationInterface {
    name = 'InitTasks1704630485449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "dashboard_id" character varying, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_4cbbe0812e7eff4e852262cc8cd" FOREIGN KEY ("dashboard_id") REFERENCES "dashboards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_4cbbe0812e7eff4e852262cc8cd"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
