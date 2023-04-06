import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1663174512624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS user (
            id int NOT NULL AUTO_INCREMENT,
            created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            password varchar(255) DEFAULT NULL,
            is_verified tinyint NOT NULL DEFAULT '0',
            verification_code varchar(4) NOT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS customer (
            id int NOT NULL AUTO_INCREMENT,
            created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            first_name varchar(80) NOT NULL,
            last_name varchar(80) NOT NULL,
            email varchar(255) NOT NULL,
            phone_number varchar(255) NOT NULL,
            birth_date datetime NOT NULL,
            country varchar(80) NOT NULL,
            city varchar(80) NOT NULL,
            street_address varchar(100) NOT NULL,
            apt_suite varchar(80) DEFAULT NULL,
            state varchar(80) NOT NULL,
            postal_code varchar(80) NOT NULL,
            user_id int NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY REL_5d1f609371a285123294fddcf3 (user_id),
            CONSTRAINT fk_customer_user_user_id FOREIGN KEY (user_id) REFERENCES user (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS bike_rental_order (
            id int NOT NULL AUTO_INCREMENT,
            created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            bike_id int NOT NULL,
            bike_model varchar(255) NOT NULL,
            bike_brand varchar(255) NOT NULL,
            bike_image varchar(255) DEFAULT NULL,
            initial_amount int NOT NULL,
            totalAmount_amount int NOT NULL DEFAULT '0',
            pick_up_date datetime DEFAULT NULL,
            pick_up_time varchar(255) DEFAULT NULL,
            drop_off_date datetime DEFAULT NULL,
            drop_off_time varchar(255) DEFAULT NULL,
            insurance_name enum('minimum','standard','premium') DEFAULT NULL,
            road_assistance tinyint NOT NULL DEFAULT '0',
            status enum('initial','requested','in_progress','cancelled','completed') DEFAULT 'initial',
            verification_code varchar(4) NOT NULL,
            is_verified tinyint NOT NULL DEFAULT '0',
            stripe_payment_id varchar(255) DEFAULT NULL,
            customer_id int NOT NULL,
            PRIMARY KEY (id),
            KEY FK_8c1c11d34669c5d58279928d3cf (customer_id),
            CONSTRAINT fk_bike_rental_order_customer_customer_id FOREIGN KEY (customer_id) REFERENCES customer (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS bike_accessory_order (
            id int NOT NULL AUTO_INCREMENT,
            created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            name varchar(255) NOT NULL,
            price int NOT NULL,
            bike_rental_order_id int DEFAULT NULL,
            PRIMARY KEY (id),
            KEY FK_0284554d83ee0cf2873279ae939 (bike_rental_order_id),
            CONSTRAINT fk_bike_accessory_order_bike_rental_order_bike_rental_order_id FOREIGN KEY (bike_rental_order_id) REFERENCES bike_rental_order (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE bike_accessory_order;`);
    await queryRunner.query(`DROP TABLE bike_rental_order;`);
    await queryRunner.query(`DROP TABLE customer;`);
    await queryRunner.query(`DROP TABLE user;`);
  }
}
