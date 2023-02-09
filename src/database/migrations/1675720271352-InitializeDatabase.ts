import {MigrationInterface, QueryRunner} from 'typeorm'

export class InitializeDatabase1675720271352 implements MigrationInterface {
  name = 'InitializeDatabase1675720271352'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "display_name" character varying, "frist_name" character varying,  "role" character varying NOT NULL DEFAULT 'PROMOTER', "last_name" character varying, "onboarded_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
