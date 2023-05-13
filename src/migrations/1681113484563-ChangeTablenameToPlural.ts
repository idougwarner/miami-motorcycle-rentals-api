import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTablenameToPlural1681113484563
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`RENAME TABLE bike TO bikes;`);
    await queryRunner.query(
      `ALTER TABLE bikes CHANGE COLUMN created created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bikes CHANGE COLUMN updated updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(
      `RENAME TABLE bike_accessory_order TO bike_accessory_orders;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_accessory_orders CHANGE COLUMN created created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_accessory_orders CHANGE COLUMN updated updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(
      `RENAME TABLE bike_insurance_plan TO bike_insurance_plans;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_insurance_plans CHANGE COLUMN created created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_insurance_plans CHANGE COLUMN updated updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(
      `RENAME TABLE bike_rental_order TO bike_rental_orders;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_orders CHANGE COLUMN created created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_orders CHANGE COLUMN updated updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(`RENAME TABLE user TO users;`);
    await queryRunner.query(
      `ALTER TABLE users CHANGE COLUMN created created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE users CHANGE COLUMN updated updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`RENAME TABLE bikes TO bike;`);
    await queryRunner.query(
      `ALTER TABLE bike CHANGE COLUMN created_at created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike CHANGE COLUMN updated_at updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(
      `RENAME TABLE bike_accessory_orders TO bike_accessory_order;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_accessory_order CHANGE COLUMN created_at created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_accessory_order CHANGE COLUMN updated_at updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(
      `RENAME TABLE bike_insurance_plans TO bike_insurance_plan;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_insurance_plan CHANGE COLUMN created_at created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_insurance_plan CHANGE COLUMN updated_at updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(
      `RENAME TABLE bike_rental_orders TO bike_rental_order;`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_order CHANGE COLUMN created_at created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE bike_rental_order CHANGE COLUMN updated_at updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );

    await queryRunner.query(`RENAME TABLE users TO user;`);
    await queryRunner.query(
      `ALTER TABLE user CHANGE COLUMN created_at created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
    await queryRunner.query(
      `ALTER TABLE user CHANGE COLUMN updated_at updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);`,
    );
  }
}
