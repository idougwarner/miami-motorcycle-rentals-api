import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCustomerUpdateOrder1663174687303
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bike_rental_order DROP FOREIGN KEY fk_bike_rental_order_customer_customer_id;`,
    );

    await queryRunner.query(
      `ALTER TABLE bike_rental_order
              RENAME COLUMN initial_amount TO daily_price_bike,
              RENAME COLUMN totalAmount_amount TO order_total_amount,
              RENAME COLUMN customer_id TO user_id,
              ADD COLUMN order_subtotal_amount int NULL,
              ADD COLUMN insurance_deposit int NULL,
              ADD COLUMN insurance_daily_rate int NULL;`,
    );

    await queryRunner.query(
      `ALTER TABLE user
              ADD COLUMN first_name varchar(80) NOT NULL,
              ADD COLUMN last_name varchar(80) NOT NULL,
              ADD COLUMN email varchar(255) NOT NULL,
              ADD COLUMN phone_number varchar(255) NOT NULL,
              ADD COLUMN birth_date datetime NOT NULL,
              ADD COLUMN country varchar(80) NOT NULL,
              ADD COLUMN city varchar(80) NOT NULL,
              ADD COLUMN street_address varchar(100) NOT NULL,
              ADD COLUMN apt_suite varchar(80) DEFAULT NULL,
              ADD COLUMN state varchar(80) NOT NULL,
              ADD COLUMN postal_code varchar(80) NOT NULL,
              ADD COLUMN stripe_customer_id varchar(100) NULL;`,
    );

    await queryRunner.query(`SET SQL_SAFE_UPDATES = 0;`);

    await queryRunner.query(
      `UPDATE user us
              INNER JOIN customer c ON us.id = c.user_id
              SET us.first_name = c.first_name,
                  us.last_name = c.last_name,
                  us.email = c.email,
                  us.phone_number = c.phone_number,
                  us.birth_date = c.birth_date,
                  us.country = c.country,
                  us.city = c.city,
                  us.street_address = c.street_address,
                  us.apt_suite = c.apt_suite,
                  us.state = c.state,
                  us.postal_code = c.postal_code;`,
    );

    await queryRunner.query(`DROP TABLE customer;`);

    await queryRunner.query(
      `ALTER TABLE bike_rental_order
              ADD CONSTRAINT fk_bike_rental_order_user_user_id FOREIGN KEY (user_id) REFERENCES user (id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE customer (
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
        ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`);

    await queryRunner.query(`
        INSERT INTO customer
            (id, first_name, last_name, email, phone_number, birth_date, country, city, street_address, apt_suite, state, postal_code, user_id, created, updated)
        SELECT id, first_name, last_name, email, phone_number, birth_date, country, city, street_address, apt_suite, state, postal_code, id, created, updated
            FROM user;`);

    await queryRunner.query(
      `ALTER TABLE bike_rental_order DROP FOREIGN KEY fk_bike_rental_order_user_user_id;`,
    );

    await queryRunner.query(`
        ALTER TABLE bike_rental_order
        RENAME COLUMN daily_price_bike TO initial_amount,
        RENAME COLUMN order_total_amount TO totalAmount_amount,
        RENAME COLUMN user_id TO customer_id,
        DROP COLUMN order_subtotal_amount,
        DROP COLUMN insurance_deposit,
        DROP COLUMN insurance_daily_rate;`);

    await queryRunner.query(`
        ALTER TABLE user
        DROP COLUMN first_name,
        DROP COLUMN last_name,
        DROP COLUMN email,
        DROP COLUMN phone_number,
        DROP COLUMN birth_date,
        DROP COLUMN country,
        DROP COLUMN city,
        DROP COLUMN street_address,
        DROP COLUMN apt_suite,
        DROP COLUMN state,
        DROP COLUMN postal_code,
        DROP COLUMN stripe_customer_id;`);

    await queryRunner.query(`
        ALTER TABLE bike_rental_order
        ADD CONSTRAINT fk_bike_rental_order_customer_customer_id FOREIGN KEY (customer_id) REFERENCES customer (id);`);
  }
}
