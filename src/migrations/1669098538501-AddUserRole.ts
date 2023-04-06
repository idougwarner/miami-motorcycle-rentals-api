import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1669098538501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user ADD role  enum('administrator','customer') NOT NULL DEFAULT 'customer';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user DROP COLUMN role;`);
  }
}
