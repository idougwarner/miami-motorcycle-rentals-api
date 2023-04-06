import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyDateColumns1664297686891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user MODIFY COLUMN birth_date date;`);
    await queryRunner.query(
      `ALTER TABLE bike_rental_order MODIFY COLUMN pick_up_date date;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_order MODIFY COLUMN drop_off_date date;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user MODIFY COLUMN birth_date datetime;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_order MODIFY COLUMN pick_up_date datetime;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_order MODIFY COLUMN drop_off_date datetime;`,
    );
  }
}
