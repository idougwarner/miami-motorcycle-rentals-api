import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateForeginKeyRef1681136331282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `bike_types` ADD CONSTRAINT fk_bike_types_media_items FOREIGN KEY (`media_item_id`) REFERENCES `media_items` (`id`);',
    );

    await queryRunner.query(
      'ALTER TABLE `bike_brands` ADD CONSTRAINT fk_bike_brands_media_items FOREIGN KEY (`media_item_id`) REFERENCES `media_items` (`id`);',
    );

    await queryRunner.query(
      'ALTER TABLE `bike_media_items` ADD CONSTRAINT fk_bike_media_items_bikes FOREIGN KEY (`bike_id`) REFERENCES `bikes` (`id`);',
    );
    await queryRunner.query(
      'ALTER TABLE `bike_media_items` ADD CONSTRAINT fk_bike_media_items_media_items FOREIGN KEY (`media_item_id`) REFERENCES `media_items` (`id`);',
    );

    await queryRunner.query(
      'ALTER TABLE `bikes` ADD CONSTRAINT fk_bikes_media_items FOREIGN KEY (`featured_media_item_id`) REFERENCES `media_items` (`id`);',
    );
    await queryRunner.query(
      'ALTER TABLE `bikes` ADD CONSTRAINT fk_bikes_bike_types FOREIGN KEY (`type_id`) REFERENCES `bike_types` (`id`);',
    );
    await queryRunner.query(
      'ALTER TABLE `bikes` ADD CONSTRAINT fk_bikes_bike_brands FOREIGN KEY (`brand_id`) REFERENCES `bike_brands` (`id`);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `bike_types` DROP FOREIGN KEY fk_bike_types_media_items;',
    );
    await queryRunner.query(
      'ALTER TABLE `bike_brands` DROP FOREIGN KEY fk_bike_brands_media_items;',
    );
    await queryRunner.query(
      'ALTER TABLE `bike_media_items` DROP FOREIGN KEY fk_bike_media_items_bikes;',
    );
    await queryRunner.query(
      'ALTER TABLE `bike_media_items` DROP FOREIGN KEY fk_bike_media_items_media_items;',
    );

    await queryRunner.query(
      'ALTER TABLE `bikes` DROP FOREIGN KEY fk_bikes_media_items;',
    );
    await queryRunner.query(
      'ALTER TABLE `bikes` DROP FOREIGN KEY fk_bikes_bike_types;',
    );
    await queryRunner.query(
      'ALTER TABLE `bikes` DROP FOREIGN KEY fk_bikes_bike_brands;',
    );
  }
}
