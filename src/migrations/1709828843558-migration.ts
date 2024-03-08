import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1709828843558 implements MigrationInterface {
  name = 'Migration1709828843558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "weather" (
                "id" SERIAL NOT NULL, 
                "lat" double precision NOT NULL, 
                "lon" double precision NOT NULL, 
                "data" jsonb NOT NULL DEFAULT '{}', 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_af9937471586e6798a5e4865f2d" PRIMARY KEY ("id")
                )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "weather"`);
  }
}
