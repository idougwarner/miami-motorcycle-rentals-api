import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../shared/common';
export class CreateAdminUser1669070386405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('password', 10);
    await queryRunner.query(
      `INSERT INTO users (password, is_verified, verification_code, first_name, last_name, email, phone_number, birth_date,
        country, city, street_address, apt_suite, state, postal_code, role) VALUES
      ('${password}', true, '1234', 'Administrator', 'Miami', 'info@miamimotorcyclerentals.com', '11111111', '1937-08-08', '1937-08-08',
       'Miami', 'address', '154', 'SP', '41018', '${UserRole.ADMIN}');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users where email = 'info@miamimotorcyclerentals.com';`,
    );
  }
}
