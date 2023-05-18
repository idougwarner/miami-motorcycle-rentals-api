import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AppConstants } from 'src/shared/common';
import { parseWpAttachmentMetadata } from 'src/shared/utils/parseWpAttachmentMetadata';
import { EntityManager } from 'typeorm';
import { MediaItem } from '../entity/media-item.entity';
import { getMediaType } from 'src/shared/utils/getMediaType';
import { BikeBrand } from '../entity/bike-brands.entity';
import { BikeType } from '../entity/bike-type.entity';
import { Bike } from '../entity/bike.entity';
import { BikeMediaItem } from '../entity/bike-media-item.entity';
import { processInBatches } from '../../shared/utils/processInBatches';
import { uploadFileToS3 } from '../../shared/utils/uploadFileToS3';
import { TransformedMediaItem } from '../entity/transformed-media-item.entity';

@Injectable()
export class WPMigrationService {
  constructor(
    // @InjectEntityManager(AppConstants.WP_DB_CONNECTION)
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

  private readonly brandRevisions = {
    'Harley-Davidson':
      'A Harley-Davidson is more than a motorcycle, it’s a cultural statement. When you jump on the back of a Harley, you are not just taking a great motorcycle out for a spin. You are joining a tradition of motorcycle lovers who are committed to Harley not just for the technology, but for the soul. Since 1903, a loyal group of bikers has chosen the natural, gnarly feeling of a Harley over any other motorcycle. Why? In a word: classic.',
    'Indian Motorcycles':
      'Since 1901, Indian Motorcycles have been reserved for an elite club of bikers who make their own rules. Indian motorcycles are renowned for their exceptional craftsmanship and first-class feel. Back then, the brand was responsible for some of the biggest advancements in motorcycle technology. Today, the updated models continue to boast a classic yet modern feel with top of the line amenities. You can rent one right here, right now with Miami Motorcycle Rentals.',
    'Honda Motorcycles':
      'Honda has maintained the spot as the largest motorcycle manufacturer in the world since the 1950s. The Honda trademark is reliability. Honda motorcycles rarely break down and are rated for their unbeatable combo of high-quality and high-value. Simple yet classic, Honda motorcycles are loved by motorcyclists all around the world. If you are after a rock-solid motorcycle that is ready to go at the twist of the throttle, rent a Miami Honda Motorcycle today.',
    'Suzuki Motorcycles':
      'Suzuki is one of the oldest and most renowned motorcycle brands in the world. The brand continues to offers some of the most advanced motorcycles in the industry. Suzuki fans tend to have a need for speed and respect for the brand’s advanced technology. In addition to being fast, Suzuki motorcycles are reliable and fuel-efficient. If you plan on racing down Palm Beach or the Florida Keys on a sleek bike that won’t quit, book a Suzuki Motorcycle rental in Miami now.',
    'Ducati Motorcycles':
      'A Ducati Motorcycle is almost synonymous to speed as the company competes in races since the 1940s. Development and innovation have been Ducati’s mission ever since its inception, and both power and acceleration have been necessary signatures from the brand. Riding on a Ducati is an experience of a lifetime. Why choose a Ducati? It’s not just the name but also the thrill of the ride!',
    'BMW Motorcycles':
      'When you hear the brand BMW, high-end, iconic cars quickly come to mind. Imagine the quality and performance utilized by BMW for their motorcycles. The modern BMW motorcycle showcases unmatched beauty and functionality equipped with German technology. Bikers choose BMW for their combination of off-road and on-road capabilities, leading to maximum comfort and safety during longer rides. Why rent one? You get the speed, the style, and the performance at unparalleled levels!',
    'Vitacci Motorcycles': '',
    'Yamaha Motorcycles':
      'According to Consumer Reports, Yamaha is rated by owners as the most reliable motorcycle brand. There is an 11% failure rate on a four year old bike, which is best among manufacturers. The brand is known for affordable and yet extremely reliable transportation throughout the model line. Try one for yourself and rent a Yamaha Motorcycle in Miami, Florida.',
    'Italica Motorcycles': '',
    'Vespa Motorcycles': '',
  };

  async changeAutoIncrementValue(tableName: string, newValue: number) {
    await this.appConnection.query(`ALTER TABLE ?? AUTO_INCREMENT = ?`, [
      tableName,
      newValue,
    ]);

    const database = process.env.DB_NAME;
    await this.appConnection.query(
      `ANALYZE TABLE \`${database}\`.\`${tableName}\`;`,
    );
  }

  async getNextAutoIncrementValue(entity): Promise<number> {
    // Force MySQL to update table statistics
    const tableName =
      this.appConnection.getRepository(entity).metadata.tableName;
    const database = process.env.DB_NAME;
    await this.appConnection.query(
      `ANALYZE TABLE \`${database}\`.\`${tableName}\`;`,
    );

    const result = await this.appConnection.query(
      `
      SELECT \`AUTO_INCREMENT\`
      FROM   \`information_schema\`.\`TABLES\`
      WHERE  \`TABLE_SCHEMA\` = ?
      AND    \`TABLE_NAME\`   = ?;
    `,
      [database, tableName],
    );

    return result[0].AUTO_INCREMENT;
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

    const startIndex = await this.getNextAutoIncrementValue(MediaItem);
    return rawData.map((row, i) => {
      const attachment_metadata = parseWpAttachmentMetadata(
        row.attachment_metadata,
      );
      return {
        id: +startIndex + i,
        ...row,
        attachment_metadata,
      };
    });
  }

  getTransformedMediaItems(mediaItems) {
    const constructTransformedMediaItems = (mediaItem) => {
      const baseUrl = mediaItem.media_url.substring(
        0,
        mediaItem.media_url.lastIndexOf('/') + 1,
      );

      const transformedImages = [];
      for (const size in mediaItem.attachment_metadata.sizes) {
        const image = mediaItem.attachment_metadata.sizes[size];
        transformedImages.push({
          width: image.width,
          height: image.height,
          filesize: 0,
          mime_type: image['mime-type'],
          media_size: size,
          media_url: `${baseUrl}${image.file}`,
          filename: image.file,
          mediaItemId: mediaItem.id,
          type: getMediaType(image['mime-type']),
        });
      }

      return transformedImages;
    };

    const mediaItemsSizes = mediaItems.map(constructTransformedMediaItems);
    const transformedMediaItems = mediaItemsSizes.reduce(
      (acc, val) => acc.concat(val),
      [],
    );
    return transformedMediaItems;
  }

  async getBikeBrandMapping() {
    return this.wpDbConnection.query(
      `select
        wap.ID bike_wp_id,
        wap2.meta_value brand_index_name
      from
        wp_ay_posts wap
      join wp_ay_yoast_indexable wayi on
        wayi.object_id = wap.ID
      join wp_ay_postmeta wap2 on
          wap2.post_id = wap.id AND wap2.meta_key = 'brand'
      where
        wayi.object_type = 'post'
        AND wayi.object_sub_type = 'motorcycle-rental'`,
    );
  }

  async getBikeTypeMapping() {
    return this.wpDbConnection.query(
      `select
        wap.ID bike_wp_id,
        wap2.meta_value type_index_name
      from
        wp_ay_posts wap
      join wp_ay_yoast_indexable wayi on
        wayi.object_id = wap.ID
      join wp_ay_postmeta wap2 on
          wap2.post_id = wap.id AND wap2.meta_key = 'type-of-motorcycle'
      where
        wayi.object_type = 'post'
        AND wayi.object_sub_type = 'motorcycle-rental'`,
    );
  }

  async getBikeMediaItems() {
    return this.wpDbConnection.query(
      `select
        wayi.object_id media_item_wp_id,
        wayi1.object_id bike_wp_id
      from
        wp_ay_yoast_indexable wayi
      join wp_ay_yoast_indexable wayi1 on
        wayi1.object_id = wayi.post_parent
      where
        wayi1.object_type = 'post'
        AND wayi1.object_sub_type = 'motorcycle-rental'
        AND wayi.object_type = 'post'
        AND wayi.object_sub_type = 'attachment' `,
    );
  }

  async getAllBrands(mediaItems) {
    const wpAllBrands = await this.wpDbConnection.query(
      `select
        wap.ID wp_id,
        wap.post_title name,
        wap.post_name slug,
        wayi.open_graph_image_id media_item_wp_id,
        wap.post_date_gmt created_at,
        wap.post_modified_gmt updated_at,
        1 as is_popular
      from
        wp_ay_posts wap
        join wp_ay_yoast_indexable wayi
        on wayi.object_id = wap.ID 
      where
        wap.post_type = 'popular_brands'`,
    );
    // add brands manually
    wpAllBrands.push({
      name: 'Vitacci Motorcycles',
      slug: 'vitacci-motorcycles',
      is_popular: 0,
    });
    wpAllBrands.push({
      name: 'Italica Motorcycles',
      slug: 'italica-motorcycles',
      is_popular: 0,
    });
    wpAllBrands.push({
      name: 'Vespa Motorcycles',
      slug: 'vespa-motorcycles',
      is_popular: 0,
    });

    const startIndex = await this.getNextAutoIncrementValue(BikeBrand);
    return wpAllBrands.map((brand, i) => {
      const mediaItem = mediaItems.find(
        (mediaItem) => mediaItem.wp_id === brand.media_item_wp_id,
      ) || { id: null };
      return {
        id: +startIndex + i,
        mediaItemId: mediaItem.id,
        ...brand,
        index_name: this.brandsMap[brand.name],
      };
    });
  }

  async getAllTypes(mediaItems) {
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

    const startIndex = await this.getNextAutoIncrementValue(BikeType);
    return types.map((type, i) => {
      const mediaItem = mediaItems.find(
        (mediaItem) => mediaItem.wp_id === type.media_item_wp_id,
      ) || { id: null };

      return {
        id: +startIndex + i,
        mediaItemId: mediaItem.id,
        ...type,
        index_name: this.typesMap[type.name],
      };
    });
  }

  async getAllBikes(allMediaItems, allBrands, allTypes) {
    const rows = await this.wpDbConnection.query(
      `select
        wap.ID wp_id,
        wap.post_status status,
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

    const startIndex = await this.getNextAutoIncrementValue(Bike);

    return Promise.all(
      rows.map(async (bike, i) => {
        const featuredMediaItem = allMediaItems.find(
          (mediaItem) => mediaItem.wp_id === bike.featured_media_item_wp_id,
        ) || { id: null };

        const bikeTypeMaps = await this.getBikeTypeMapping();
        const bikeTypeMap = bikeTypeMaps.find(
          (map) => map.bike_wp_id === bike.wp_id,
        );
        const bikeType = allTypes.find(
          (bikeType) => bikeType.index_name === bikeTypeMap?.type_index_name,
        ) || { id: null };

        const bikeBrandMaps = await this.getBikeBrandMapping();
        const bikeBrandMap = bikeBrandMaps.find(
          (map) => map.bike_wp_id === bike.wp_id,
        );
        const bikeBrand = allBrands.find(
          (bikeBrand) =>
            bikeBrand.index_name === bikeBrandMap?.brand_index_name,
        ) || { id: null };

        return {
          id: +startIndex + i,
          featuredMediaItemId: featuredMediaItem.id,
          typeId: bikeType.id,
          brandId: bikeBrand.id,
          ...bike,
        };
      }),
    );
  }

  async getCurrentBikes() {
    return await this.appConnection.query(`SELECT * from bikes`);
  }

  async getAllBikeMediaItems(allBikes, allMediaItems) {
    const bikeMediaItems = await this.wpDbConnection.query(
      `select
        wap.ID bike_wp_id,
        wap2.meta_value media_item_wp_id 
      from
        wp_ay_posts wap
      join wp_ay_yoast_indexable wayi on
        wayi.object_id = wap.ID
      join wp_ay_postmeta wap2 on
        wap2.post_id = wap.ID
        AND wap2.meta_key LIKE 'gallery_gallery_image_%'
      where
        wayi.object_type = 'post'
        AND wayi.object_sub_type = 'motorcycle-rental'
        AND wap2.meta_value is not NULL
        AND wap2.meta_value <> '';`,
    );
    const startIndex = await this.getNextAutoIncrementValue(BikeMediaItem);
    return bikeMediaItems.map((bikeMediaItem, i) => {
      const bike = allBikes.find(
        (bike) => bike.wp_id === bikeMediaItem.bike_wp_id,
      ) || { id: null };

      const mediaItem = allMediaItems.find(
        (mediaItem) => mediaItem.wp_id === bikeMediaItem.media_item_wp_id,
      ) || { id: null };
      return {
        id: +startIndex + i,
        mediaItemId: mediaItem.id,
        bikeId: bike.id,
      };
    });
  }

  async cleanDB() {
    const mediaItemsTblName =
      this.appConnection.getRepository(MediaItem).metadata.tableName;
    const bikeBrandsTblName =
      this.appConnection.getRepository(BikeBrand).metadata.tableName;
    const bikeTypesTblName =
      this.appConnection.getRepository(BikeType).metadata.tableName;
    const bikeMediaItemsTblName =
      this.appConnection.getRepository(BikeMediaItem).metadata.tableName;

    await this.appConnection.query(
      `UPDATE bikes set type_id=NULL, brand_id=NULL, featured_media_item_id=NULL`,
    );

    await this.appConnection.query(`DELETE FROM ${bikeMediaItemsTblName}`);
    await this.changeAutoIncrementValue(bikeMediaItemsTblName, 1);

    await this.appConnection.query(`DELETE FROM ${bikeBrandsTblName}`);
    await this.changeAutoIncrementValue(bikeBrandsTblName, 1);

    await this.appConnection.query(`DELETE FROM ${bikeTypesTblName}`);
    await this.changeAutoIncrementValue(bikeTypesTblName, 1);

    await this.appConnection.query(`DELETE FROM ${mediaItemsTblName}`);
    await this.changeAutoIncrementValue(mediaItemsTblName, 1);
  }

  async createMediaItems(mediaItems) {
    // get app wp media items
    const makeNewMediaItem = async (mediaItem) => {
      const { uploadedFileUrl, fileSizeInKB } = await uploadFileToS3(
        mediaItem.media_url,
        mediaItem.attachment_metadata.file.replace(/\//g, '-'),
      );
      return {
        id: mediaItem.id,
        title: mediaItem.title,
        width: mediaItem.attachment_metadata.width,
        height: mediaItem.attachment_metadata.height,
        filename: mediaItem.attachment_metadata.file,
        filesize: fileSizeInKB || 0,
        mediaUrl: uploadedFileUrl,
        alt: mediaItem.alt,
        mimeType: mediaItem.mime_type,
        type: getMediaType(mediaItem.mime_type),
      };
    };

    const values = await processInBatches(
      mediaItems,
      (mediaItem) => makeNewMediaItem(mediaItem),
      100,
      10,
    );

    // insert media_items in app db
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(MediaItem)
      .values(values)
      .execute();
  }

  async createTransformedMediaItems(mediaItems) {
    // get app wp media items
    const makeNewMediaItem = async (mediaItem) => {
      const { uploadedFileUrl, fileSizeInKB } = await uploadFileToS3(
        mediaItem.media_url,
        mediaItem.filename.replace(/\//g, '-'),
      );
      return {
        width: mediaItem.width,
        height: mediaItem.height,
        filesize: fileSizeInKB || 0,
        mimeType: mediaItem.mime_type,
        mediaSize: mediaItem.media_size,
        mediaUrl: uploadedFileUrl,
        filename: mediaItem.filename,
        mediaItemId: mediaItem.mediaItemId,
        type: mediaItem.type,
      };
    };

    const values = await processInBatches(
      mediaItems,
      (mediaItem) => makeNewMediaItem(mediaItem),
      100,
      10,
    );

    // insert media_items in app db
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(TransformedMediaItem)
      .values(values)
      .execute();
  }

  async createBikeBrands(allBrands) {
    // get allBrands
    const values = allBrands.map((brand) => {
      return {
        id: brand.id,
        name: brand.name,
        slug: brand.slug,
        mediaItemId: brand.mediaItemId,
        isPopular: brand.is_popular,
        revision: this.brandRevisions[brand.name] || '',
      };
    });
    // insert
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(BikeBrand)
      .values(values)
      .execute();
  }

  async createBikeTypes(allTypes) {
    // get allTypes
    const values = allTypes.map((type) => ({
      id: type.id,
      name: type.name,
      slug: type.slug,
      mediaItemId: type.mediaItemId,
    }));
    // insert
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(BikeType)
      .values(values)
      .execute();
  }

  async createBikes(allBikes) {
    const values = allBikes.map((bike) => ({
      id: bike.id,
      wpBikeId: bike.wp_id,
      seoTitle: bike.seo_title || '',
      seoDescription: bike.seo_description || '',
      name: bike.name || '',
      slug: bike.slug || '',
      description: bike.description || '',
      model: bike.model || '',
      regularPrice: bike.regular_price || 0,
      discountPrice: bike.discount_price || 0,
      distanceIncluded: bike.distance_included || '',
      highlights: bike.highlights || '',
      features: bike.features || '',
      extras: bike.extras || '',
      status: bike.status || null,
      featuredMediaItemId: bike.featuredMediaItemId,
      typeId: bike.typeId,
      brandId: bike.brandId,
    }));
    // insert
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(Bike)
      .values(values)
      .execute();
  }

  async updateBikes(allBikes) {
    // update
    Promise.all(
      allBikes.map(async (bike) => {
        await this.appConnection
          .createQueryBuilder()
          .update(Bike)
          .set({
            seoTitle: bike.seo_title || '',
            seoDescription: bike.seo_description || '',
            name: bike.name || '',
            slug: bike.slug || '',
            description: bike.description || '',
            model: bike.model || '',
            regularPrice: bike.regular_price || 0,
            discountPrice: bike.discount_price || 0,
            distanceIncluded: bike.distance_included || '',
            highlights: bike.highlights || '',
            features: bike.features || '',
            extras: bike.extras || '',
            status: bike.status || null,
            featuredMediaItemId: bike.featuredMediaItemId,
            typeId: bike.typeId,
            brandId: bike.brandId,
          })
          .where('wp_bike_id = :wpId', { wpId: bike.wp_id })
          .execute();
      }),
    );
  }

  async createBikeMediaItems(allBikeMediaItems) {
    const values = allBikeMediaItems.map((bikeMediaItem) => ({
      id: bikeMediaItem.id,
      bikeId: bikeMediaItem.bikeId,
      mediaItemId: bikeMediaItem.mediaItemId,
    }));
    console.log(
      'Null BikeMediaItems',
      values.filter((el) => !el.bikeId || !el.mediaItemId),
    );
    // insert
    await this.appConnection
      .createQueryBuilder()
      .insert()
      .into(BikeMediaItem)
      .values(values.filter((el) => el.bikeId && el.mediaItemId))
      .execute();
  }

  async migrate() {
    await this.cleanDB();
    console.log('🚀 Cleaned tables');

    const allMediaItems = await this.getAllMediaItems();

    const allTransformedMediaItems =
      this.getTransformedMediaItems(allMediaItems);

    const allBrands = await this.getAllBrands(allMediaItems);
    const allTypes = await this.getAllTypes(allMediaItems);
    const allBikes = await this.getAllBikes(allMediaItems, allBrands, allTypes);

    await this.createMediaItems(allMediaItems);
    console.log('🚀 Migrated media_items table');

    await this.createTransformedMediaItems(allTransformedMediaItems);
    console.log('🚀 Migrated transformed_media_item table');

    await this.createBikeBrands(allBrands);
    console.log('🚀 Migrated bike_brands table');

    await this.createBikeTypes(allTypes);
    console.log('🚀 Migrated bike_types table');

    const currentBikes = await this.getCurrentBikes();
    const { newBikes, updateBikes } = allBikes.reduce(
      (acc, element) => {
        const currentBike = currentBikes.find(
          (currentBike) => +currentBike.wp_bike_id === +element.wp_id,
        );
        if (currentBike) {
          acc.updateBikes.push({
            ...element,
            id: currentBike.id,
          });
        } else {
          acc.newBikes.push(element);
        }
        return acc;
      },
      { updateBikes: [], newBikes: [] },
    );

    await this.updateBikes(updateBikes);
    console.log('🚀 Update bikes table');

    await this.createBikes(newBikes);
    console.log('🚀 Insert bikes table');

    const allBikeMediaItems = await this.getAllBikeMediaItems(
      [...updateBikes, ...newBikes],
      allMediaItems,
    );

    await sleep();

    await this.createBikeMediaItems(allBikeMediaItems);
    console.log('🚀 Migrate bike_media_items table');

    console.log(
      `🚀 Completed tables migrate. Please run @Post('/migrationUpdate') API to update bikeId in bikeRentalRepository`,
    );
  }
}

const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
