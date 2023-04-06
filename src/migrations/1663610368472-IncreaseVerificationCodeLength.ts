import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncreaseVerificationCodeLength1663610368472
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bike_rental_order MODIFY COLUMN verification_code VARCHAR(5);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bike_rental_order MODIFY COLUMN verification_code VARCHAR(4);`,
    );
  }
}
