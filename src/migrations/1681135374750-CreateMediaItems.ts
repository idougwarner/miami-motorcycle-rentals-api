import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMediaItems1681135374750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE media_items (
        id int NOT NULL AUTO_INCREMENT,
        width integer NOT NULL,
        height integer NOT NULL,
        filesize float NOT NULL,
        mime_type varchar(30) NOT NULL,
        media_url varchar(255) NOT NULL,
        filename varchar(255) NOT NULL,
        title varchar(255) NOT NULL,
        alt varchar(255) NOT NULL,
        type enum('image','video','audio') DEFAULT 'image',
        created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE media_items;`);
  }
}
