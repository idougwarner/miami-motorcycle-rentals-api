import { BikeStatus } from '../shared/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusColToBikes1681825192252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bikes ADD COLUMN status enum('${BikeStatus.Publish}','${BikeStatus.Draft}') DEFAULT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE bikes DROP COLUMN status;`);
  }
}
