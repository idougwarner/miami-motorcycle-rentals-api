import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscountPercentageToBike1696355852157
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bikes ADD COLUMN discount_percentage TEXT NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bikes DROP COLUMN discount_percentage;`,
    );
  }
}
