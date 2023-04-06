import { MigrationInterface, QueryRunner } from 'typeorm';

export class ApplyDynamicInsurance1670624624206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE bike (
            id int NOT NULL AUTO_INCREMENT,
            created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            wp_bike_id int NOT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await queryRunner.query(`
        CREATE TABLE bike_insurance_plan (
            id int NOT NULL AUTO_INCREMENT,
            created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            min_age int NOT NULL,
            max_age int NOT NULL,
            type enum('minimum','standard','premium') NOT NULL DEFAULT 'minimum',
            daily_rate int NOT NULL,
            deposit int NOT NULL,
            description varchar(255) NOT NULL,
            pop_up_description varchar(255) NOT NULL,
            bike_id int NOT NULL,
            PRIMARY KEY (id),
            KEY fk_bike_insurance_plan_bike_bike_id (bike_id),
            CONSTRAINT fk_bike_insurance_plan_bike_bike_id FOREIGN KEY (bike_id) REFERENCES bike (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await queryRunner.query(`
        ALTER TABLE bike_rental_order ADD COLUMN insurance_id int NULL,
        ADD CONSTRAINT fk_bike_rental_order_bike_insurance_plan_insurance_id FOREIGN KEY (insurance_id) REFERENCES bike_insurance_plan(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        alter table bike_rental_order drop FOREIGN KEY fk_bike_rental_order_bike_insurance_plan_insurance_id;
    `);

    await queryRunner.query(`
        alter table bike_rental_order drop column insurance_id;
    `);

    await queryRunner.query(`
        DROP TABLE bike_insurance_plan;
    `);

    await queryRunner.query(`DROP TABLE bike;`);
  }
}
