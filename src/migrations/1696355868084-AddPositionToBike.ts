import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPositionToBike1696355868084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bikes ADD COLUMN position float NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE bikes DROP COLUMN position;`);
  }
}
