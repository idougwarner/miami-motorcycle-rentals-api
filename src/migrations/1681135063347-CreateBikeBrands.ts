import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBikeBrands1681135063347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE bike_brands (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        slug varchar(100) NOT NULL,
        media_item_id integer,
        is_popular tinyint NOT NULL DEFAULT '0',
        revision TEXT NOT NULL,
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE bike_brands;`);
  }
}
