import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColsToBikes1681115422730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE bikes
          ADD COLUMN seo_title varchar(100) NOT NULL,
          ADD COLUMN seo_description TEXT NOT NULL,
          ADD COLUMN name varchar(100) NOT NULL,
          ADD COLUMN slug varchar(100) NOT NULL,
          ADD COLUMN featured_media_item_id int,
          ADD COLUMN description TEXT NOT NULL,
          ADD COLUMN type_id int,
          ADD COLUMN brand_id int,
          ADD COLUMN model varchar(100) NOT NULL,
          ADD COLUMN regular_price float NOT NULL,
          ADD COLUMN discount_price float NOT NULL,
          ADD COLUMN distance_included varchar(255) NOT NULL,
          ADD COLUMN highlights TEXT NOT NULL,
          ADD COLUMN features TEXT NOT NULL,
          ADD COLUMN extras TEXT NOT NULL;`,
    );
    // await queryRunner.query(`ALTER TABLE bikes DROP COLUMN wp_bike_id;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE bikes
          DROP COLUMN seo_title,
          DROP COLUMN seo_description,
          DROP COLUMN name,
          DROP COLUMN slug,
          DROP COLUMN featured_media_item_id,
          DROP COLUMN description,
          DROP COLUMN type_id,
          DROP COLUMN brand_id,
          DROP COLUMN model,
          DROP COLUMN regular_price,
          DROP COLUMN discount_price,
          DROP COLUMN distance_included,
          DROP COLUMN highlights,
          DROP COLUMN features,
          DROP COLUMN extras;
      `);
    // await queryRunner.query(`ALTER TABLE bikes ADD COLUMN wp_bike_id int NOT NULL;`);
  }
}
