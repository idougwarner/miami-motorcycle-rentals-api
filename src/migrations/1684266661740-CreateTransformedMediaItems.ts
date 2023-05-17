import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransformedMediaItems1684266661740
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE transformed_media_items (
        id int NOT NULL AUTO_INCREMENT,
        width integer NOT NULL,
        height integer NOT NULL,
        filesize float NOT NULL,
        mime_type varchar(30) NOT NULL,
        media_size varchar(255) NOT NULL,
        media_url varchar(255) NOT NULL,
        filename varchar(255) NOT NULL,
        media_item_id integer NOT NULL,
        type enum('image','video','audio') DEFAULT 'image',
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await queryRunner.query(
      'ALTER TABLE `transformed_media_items` ADD CONSTRAINT fk_transformed_media_items_media_items FOREIGN KEY (`media_item_id`) REFERENCES `media_items` (`id`);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE transformed_media_items;`);
  }
}
