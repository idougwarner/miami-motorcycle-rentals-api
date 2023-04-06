import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdditionalOrderStatus1663510610774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bike_rental_order CHANGE status status ENUM('initial','on_checkout','approved','requested','in_progress','cancelled','completed') DEFAULT 'initial';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bike_rental_order CHANGE status status ENUM('initial','requested','in_progress','cancelled','completed') DEFAULT 'initial';`,
    );
  }
}
