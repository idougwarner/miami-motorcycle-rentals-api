import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AppConstants } from 'src/shared/common';
import { parseWpAttachmentMetadata } from 'src/shared/utils/parseWpAttachmentMetadata';
import { EntityManager } from 'typeorm';
import { MediaItem } from '../entity/media-item.entity';
import { getMediaType } from 'src/shared/utils/getMediaType';
import { BikeBrand } from '../entity/bike-brands.entity';
import { BikeType } from '../entity/bike-type.entity';

@Injectable()
export class WPMigrationService {
  constructor(
    @InjectEntityManager(AppConstants.WP_DB_CONNECTION)
    private readonly wpDbConnection: EntityManager,

    @InjectEntityManager('default')
    private readonly appConnection: EntityManager,
  ) {}

  private readonly brandsMap = {
    'Harley-Davidson': 'harley-davidson',
    'Indian Motorcycles': 'indian',
    'Honda Motorcycles': 'honda',
    'Suzuki Motorcycles': 'suzuki',
    'Ducati Motorcycles': 'ducati',
    'BMW Motorcycles': 'bmw',
    'Vitacci Motorcycles': 'vitacci',
    'Yamaha Motorcycles': 'yamaha',
    'Italica Motorcycles': 'italica',
    'Vespa Motorcycles': 'vespa',
  };
  private readonly typesMap = {
    'Touring Motorcycles': 'touring-motorcycles',
    Scooters: 'scooters',
    'Street Motorcycles': 'street-motorcycles',
    'Sport Bikes': 'sport-bike',
    'Naked Motorcycles': 'naked-motorcycles',
    'Standard Motorcycles': 'standard-motorcycles',
  };

  private allBrands;

  async changeAutoIncrementValue(tableName: string, newValue: number) {
    this.appConnection.query(`ALTER TABLE ?? AUTO_INCREMENT = ?`, [
      tableName,
      newValue,
    ]);
  }

  async getAllBrands() {
    const wpAllBrands = await this.wpDbConnection.query(
      `select
        wap.ID wp_id,
        wap.post_title name,
        wap.post_name slug,
        wayi.open_graph_image_id media_item_wp_id,
        wap.post_date_gmt created_at,
        wap.post_modified_gmt updated_at
      from
        wp_ay_posts wap
        join wp_ay_yoast_indexable wayi
        on wayi.object_id = wap.ID 
      where
        wap.post_type = 'popular_brands'`,
    );
    return wpAllBrands.map((brand) => ({
      ...brand,
      index_name: this.brandsMap[brand.name],
    }));
  }

  async getAllTypes() {
    const types = await this.wpDbConnection.query(
      `select
        wap.ID wp_id,
        wap.post_title name,
        wap.post_name slug,
        wayi.open_graph_image_id media_item_wp_id,
        wap.post_date_gmt created_at,
        wap.post_modified_gmt updated_at
      from
        wp_ay_posts wap
        join wp_ay_yoast_indexable wayi
        on wayi.object_id = wap.ID
      where
        wap.post_type = 'motorcycle_types'`,
    );

    return types.map((brand) => ({
      ...brand,
      index_name: this.typesMap[brand.name],
    }));
  }

  async getAllMediaItems() {
    const rawData = await this.wpDbConnection.query(
      `select
        wap.ID wp_id,
        wap.post_title title,
        wayi.breadcrumb_title alt,
        wap.guid media_url,
        wap.post_mime_type mime_type,
        wap2.meta_value attachment_metadata
      from
        wp_ay_posts wap
      join wp_ay_yoast_indexable wayi on
        wayi.object_id = wap.ID
      join wp_ay_postmeta wap2 on wap2.post_id = wap.ID
      where
        wayi.object_type = 'post'
        AND wayi.object_sub_type = 'attachment'
        AND wap2.meta_key = '_wp_attachment_metadata'`,
    );

    return rawData.map((row) => {
      const attachment_metadata = parseWpAttachmentMetadata(
        row.attachment_metadata,
      );
      return {
        ...row,
        attachment_metadata,
      };
    });
  }

  async getAllBikes() {
    return this.wpDbConnection.query(
      `select
        wap.ID wp_id,
        wayi.title seo_title,
        wayi.description seo_description,
        wap.post_title name,
        wap.post_name slug,
        wayi.open_graph_image_id featured_media_item_wp_id,
        wap.post_content description,
        wap2.meta_value model,
        wap3.meta_value regular_price,
        wap4.meta_value discount_price,
        wap5.meta_value distance_included,
        wap6.meta_value highlights,
        wap7.meta_value features,
        wap8.meta_value extras
      from
        wp_ay_posts wap
      join wp_ay_yoast_indexable wayi on
        wayi.object_id = wap.ID
      left join wp_ay_postmeta wap2 on
        wap2.post_id = wap.ID AND wap2.meta_key = 'model'
      left join wp_ay_postmeta wap3 on
        wap3.post_id = wap.ID AND wap3.meta_key = 'regular-price'
      left join wp_ay_postmeta wap4 on
        wap4.post_id = wap.ID AND wap4.meta_key = 'discount-price'
      left join wp_ay_postmeta wap5 on
        wap5.post_id = wap.ID AND wap5.meta_key = 'distance-included'
      left join wp_ay_postmeta wap6 on
        wap6.post_id = wap.ID AND wap6.meta_key = 'highlights'
      left join wp_ay_postmeta wap7 on
        wap7.post_id = wap.ID AND wap7.meta_key = 'features'
      left join wp_ay_postmeta wap8 on
        wap8.post_id = wap.ID AND wap8.meta_key = 'extras'
      where
        wayi.object_type = 'post'
        AND wayi.object_sub_type = 'motorcycle-rental'`,
    );
  }

  async createMediaItems() {
    // get app wp media itmes
    const wpMediaItems = await this.getAllMediaItems();
    const values = wpMediaItems.map((item) => ({
      id: item.wp_id,
      title: item.title,
      width: item.attachment_metadata.width,
      height: item.attachment_metadata.height,
      filename: item.attachment_metadata.file,
      filesize: 0,
      mediaUrl: item.media_url,
      alt: item.alt,
      mimeType: item.mime_type,
      type: getMediaType(item.mime_type),
    }));
    // insert media_items in app db
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(MediaItem)
      .values(values)
      .execute();
    const tableName =
      this.appConnection.getRepository(MediaItem).metadata.tableName;
    const lastItem = wpMediaItems[wpMediaItems.length - 1];
    await this.changeAutoIncrementValue(tableName, Number(lastItem.wp_id) + 1);
  }

  async createBikeBrands() {
    // get allBrands
    const allBrands = await this.getAllBrands();

    const values = allBrands.map((brand) => ({
      id: brand.wp_id,
      name: brand.name,
      slug: brand.slug,
      mediaItemId: brand.media_item_wp_id,
      revision: '',
    }));
    // insert
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(BikeBrand)
      .values(values)
      .execute();

    const tableName =
      this.appConnection.getRepository(BikeBrand).metadata.tableName;
    const lastItem = allBrands[allBrands.length - 1];
    await this.changeAutoIncrementValue(tableName, Number(lastItem.wp_id) + 1);
  }

  async createBikeTypes() {
    // get allTypes
    const allTypes = await this.getAllTypes();

    const values = allTypes.map((type) => ({
      id: type.wp_id,
      name: type.name,
      slug: type.slug,
      mediaItemId: type.media_item_wp_id,
    }));
    // insert
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(BikeType)
      .values(values)
      .execute();

    const tableName =
      this.appConnection.getRepository(BikeType).metadata.tableName;
    const lastItem = allTypes[allTypes.length - 1];
    await this.changeAutoIncrementValue(tableName, Number(lastItem.wp_id) + 1);
  }

  async migrate() {
    await this.createMediaItems();
    await this.createBikeBrands();
    await this.createBikeTypes();
  }
}
