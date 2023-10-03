import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBikeBasePrice1696347038909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bike_base_prices',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'bike_id',
            type: 'int',
          },
          {
            name: 'from_date',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'from_time',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'to_date',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'to_time',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'price_per_day',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['bike_id'],
            referencedTableName: 'bikes',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bike_base_prices');
  }
}
