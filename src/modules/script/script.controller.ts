import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BikeService } from '../bike/bike.service';
import { GetAllBikesRequestDto } from 'src/shared/dtos/bike/bike-get-all-request.dto';
import { BikeGetAllResponseDto } from 'src/shared/dtos/bike/bike-get-all-response.dto';
import { Connection, getConnection } from 'typeorm';

@Controller('scripts')
@ApiTags('Script Controller')
export class ScriptController {
  private connection: Connection;
  constructor(private bikeService: BikeService) {
    this.connection = getConnection();
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeGetAllResponseDto] })
  @ApiOperation({ summary: 'Script for all bikes' })
  public async updateLandingPageImgs(
    @Query() params: GetAllBikesRequestDto,
  ): Promise<any> {
    const { type_id, brand_id } = params;
    const bikes = await this.bikeService.getAllBikes(type_id, brand_id);

    const allBikesAlt = [
      'rent-a-harley-davidson-ultra-interceptor',
      'rent-a-harley-davidson-ultra-limited-flhtk',
      'rent-a-indian-roadmaster-green',
      'rent-a-harely-davidson-v-rod-muscle',
      'rent-a-harley-davidson-electra-glide-ultra-classic',
      'rent-a-harley-davidson-street-glide-flhx',
      'rent-a-indian-roadmaster-black',
      'rent-a-harley-davidson-road-king-red',
      'rent-a-harley-davidson-sportster-iron-883-brown',
      'rent-a-harley-davidson-sportster-iron-forty-eight',
      'rent-a-harley-davidson-sportster-iron-1200',
      'rent-a-suzuki-gsz-s-750',
      'rent-a-harley-davidson-sportster-iron-883-black',
      'rent-a-harley-davidson-sportster-iron-883-custom',
      'rent-a-vespa-sprint-50-motorcycle',
      'rent-a-harley-davidson-sportster-xl-883c',
      'rent-a-bmw-310r-motorcycle',
      'rent-a-yamaha-r3-motorcycle',
      'rent-a-vespa-lx-50-motorcycle-red',
      'rent-a-suzuki-tu250x-motorcycle',
      'rent-a-vespa-lx-50cc-motorcycle-yellow',
      'rent-a-italia-mini-50cc-yellow-motorcycle',
      'rent-a-italia-mini-50cc-blue-motorcycle',
      'rent-a-italia-age-50cc-red-motorcycle',
      'rent-a-vitacci-bullet-50cc-motorcycle',
      'rent-a-honda-ruckus-50cc-motorcycle',
    ];
    const imgIds = bikes.map((el) => el.featuredMediaItemId);
    if (imgIds.length !== allBikesAlt.length) {
      return 'Not matched ids and alt texts';
    }

    let query = `
      UPDATE media_items
      SET alt = CASE id `;
    imgIds.forEach((id, index) => {
      query += `WHEN ${id} THEN '${allBikesAlt[index]}' `;
    });
    query += 'END WHERE id IN (' + imgIds.join(',') + ')';
    const result = await this.connection.query(query);

    return result;
  }

  private async updateBikeMediaItemsByData(id: number, altTexts: string[]) {
    const mediaItems = await this.bikeService.getMediaItemsById(id);
    const imgIds = mediaItems.map((item) => item.id);
    if (!imgIds.length) {
      return `Not found mediaItems: ${id}: ${imgIds.length}`;
    }
    if (imgIds.length !== altTexts.length || !imgIds.length) {
      return `Not matched ids and alt texts: mediaItems: ${imgIds.length} vs altTexts: ${altTexts.length}`;
    }

    let query = `
      UPDATE media_items
      SET alt = CASE id `;
    imgIds.forEach((id, index) => {
      query += `WHEN ${id} THEN '${altTexts[index]}' `;
    });
    query += 'END WHERE id IN (' + imgIds.join(',') + ')';
    const result = await this.connection.query(query);

    return result;
  }

  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeGetAllResponseDto] })
  @ApiOperation({ summary: 'Update mediaItems of a bike' })
  public async updateBikeMediaItems(
    @Param('id') id: number,
    @Body() altTexts: string[],
  ) {
    return await this.updateBikeMediaItemsByData(id, altTexts);
  }

  @Post('/:id/bulks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update mediaItems' })
  public async bulkUpdateBikeMediaItems() {
    const bulks = [
      {
        id: 54, // rent-a-harley-davidson-ultra-interceptor
        altTexts: [
          'rent-a-harley-davidson-ultra-interceptor-front-right-side',
          'rent-a-harley-davidson-ultra-interceptor-back-right-side',
          'rent-a-harley-davidson-ultra-interceptor-engine',
          'rent-a-harley-davidson-ultra-interceptor-tour-pack',
          'rent-a-harley-davidson-ultra-interceptor-back-seat',
          'rent-a-harley-davidson-ultra-interceptor-dash',
          'rent-a-harley-davidson-ultra-interceptor-left-side',
          'rent-a-harley-davidson-ultra-interceptor-back-left-side',
        ],
      },
      {
        id: 48, // rent-a-harley-davidson-ultra-limited-flhtk
        altTexts: [
          'rent-a-harley-davidson-ultra-limited-flhtk-front-right-side',
          'rent-a-harley-davidson-ultra-limited-flhtk-back-right-side',
          'rent-a-harley-davidson-ultra-limited-flhtk-back-seat',
          'rent-a-harley-davidson-ultra-limited-flhtk-front-side',
          'rent-a-harley-davidson-ultra-limited-flhtk-left-side',
          'rent-a-harley-davidson-ultra-limited-flhtk-front-left-side',
          'rent-a-harley-davidson-ultra-limited-flhtk-back-left-side',
        ],
      },
      {
        id: 30, // rent-a-indian-roadmaster-green
        altTexts: [
          'rent-a-indian-roadmaster-green-driver-seat',
          'rent-a-indian-roadmaster-green-back-right-side',
          'rent-a-indian-roadmaster-green-front-right-side',
          'rent-a-indian-roadmaster-green-left-side',
          'rent-a-indian-roadmaster-green-dash',
          'rent-a-indian-roadmaster-green-front-side',
          'rent-a-indian-roadmaster-green-back-left-side',
        ],
      },
      {
        id: 51, // rent-a-harley-davidson-v-rod-muscle
        altTexts: [
          'rent-a-harely-davidson-v-rod-muscle-back-right-side',
          'rent-a-harely-davidson-v-rod-muscle-engine ',
          'rent-a-harely-davidson-v-rod-muscle-front-right-side',
          'rent-a-harely-davidson-v-rod-muscle-seat',
          'rent-a-harely-davidson-v-rod-muscle-back-side',
          'rent-a-harely-davidson-v-rod-muscle-back-left-side',
          'rent-a-harely-davidson-v-rod-muscle-left-side',
          'rent-a-harely-davidson-v-rod-muscle-front-left-side',
          'rent-a-harely-davidson-v-rod-muscle-front-side',
        ],
      },
      {
        id: 52, //rent-a-harley-davidson-electra-glide-ultra-classic
        altTexts: [
          'rent-a-harley-davidson-electra-glide-ultra-classic-dash',
          'rent-a-harley-davidson-electra-glide-ultra-classic-front-side',
          'rent-a-harley-davidson-electra-glide-ultra-classic-seat',
          'rent-a-harley-davidson-electra-glide-ultra-classic-tour-pack',
          'rent-a-harley-davidson-electra-glide-ultra-classic-back-side',
          'rent-a-harley-davidson-electra-glide-ultra-classic-left-side',
          'rent-a-harley-davidson-electra-glide-ultra-classic-bluetooth-radio',
          'rent-a-harley-davidson-electra-glide-ultra-classic-usb-port',
          'rent-a-harley-davidson-electra-glide-ultra-classic-screaming-eagle',
        ],
      },
      {
        id: 46, //rent-a-harley-davidson-street-glide-flhx-metallic-blue
        altTexts: [
          'rent-a-harley-davidson-street-glide-flhx-left-side',
          'rent-a-harley-davidson-street-glide-flhx-front-right-side',
          'rent-a-harley-davidson-street-glide-flhx-usb-port',
          'rent-a-harley-davidson-street-glide-flhx-back-right-side',
          'rent-a-harley-davidson-street-glide-flhx-back-rail',
          'rent-a-harley-davidson-street-glide-flhx-back-left-side',
          'rent-a-harley-davidson-street-glide-flhx-front-right-side',
          'rent-a-harley-davidson-street-glide-flhx-back-side',
          'rent-a-harley-davidson-street-glide-flhx-dash',
        ],
      },
      {
        id: 34, // rent-a-indian-roadmaster-black
        altTexts: [
          'rent-a-indian-roadmaster-black-front-right-side',
          'rent-a-indian-roadmaster-black-back-right-side',
          'rent-a-indian-roadmaster-black-back-side',
          'rent-a-indian-roadmaster-black-dash',
          'rent-a-indian-roadmaster-black-driver-seat',
          'rent-a-indian-roadmaster-black-engine',
          'rent-a-indian-roadmaster-black-back-left-side',
          'rent-a-indian-roadmaster-black-left-side',
          'rent-a-indian-roadmaster-black-front-side',
        ],
      },
      {
        id: 39, //rent-a-harley-davidson-road-king-red
        altTexts: [
          'rent-a-harley-davidson-road-king-red-front-right-side',
          'rent-a-harley-davidson-road-king-red-back-right-side',
          'rent-a-harley-davidson-road-king-red-engine',
          'rent-a-harley-davidson-road-king-red-seat',
          'rent-a-harley-davidson-road-king-red-left-side',
          'rent-a-harley-davidson-road-king-red-left-engine-side',
          'rent-a-harley-davidson-road-king-red-front-side',
          'rent-a-harley-davidson-road-king-red-dash',
          'rent-a-harley-davidson-road-king-red-back-side',
        ],
      },
      {
        id: 41, //rent-a-harley-davidson-sportster-iron-883-brown
        altTexts: [
          'rent-a-harley-davidson-sportster-iron-883-brown-front-right-side',
          'rent-a-harley-davidson-sportster-iron-883-brown-back-right-side',
          'rent-a-harley-davidson-sportster-iron-883-brown-front-left-side',
          'rent-a-harley-davidson-sportster-iron-883-brown-back-left-side',
          'rent-a-harley-davidson-sportster-iron-883-brown-seat',
          'rent-a-harley-davidson-sportster-iron-883-brown-front-side',
          'rent-a-harley-davidson-sportster-iron-883-brown-left-side ',
          'rent-a-harley-davidson-sportster-iron-883-brown-back-side',
        ],
      },
      {
        id: 35, //rent-a-harley-davidson-sportster-iron-forty-eight
        altTexts: [
          'rent-a-harley-davidson-sportster-iron-forty-eight-front-right-side',
          'rent-a-harley-davidson-sportster-iron-forty-eight-back-right-side',
          'rent-a-harley-davidson-sportster-iron-forty-eight-left-side',
          'rent-a-harley-davidson-sportster-iron-forty-eight-front-left-side',
        ],
      },
      {
        id: 32, //rent-a-harley-davidson-sportster-iron-1200
        altTexts: [
          'rent-a-harley-davidson-sportster-iron-1200-left-side',
          'rent-a-harley-davidson-sportster-iron-1200-front-right-side',
          'rent-a-harley-davidson-sportster-iron-1200-front-left-side',
          'rent-a-harley-davidson-sportster-iron-1200-passenger-seat',
          'rent-a-harley-davidson-sportster-iron-1200-single-driver-seat',
          'rent-a-harley-davidson-sportster-iron-1200-back-left-side',
          'rent-a-harley-davidson-sportster-iron-1200-left-passenger-seat-side',
          'rent-a-harley-davidson-sportster-iron-1200-single-driver-seat-left-side',
          'rent-a-harley-davidson-sportster-iron-1200-back-side',
        ],
      },
      {
        id: 43, //M: rent-a-suzuki-gsx-s-750
        altTexts: [
          'rent-a-suzuki-gsz-s-750-front-right-side',
          'rent-a-suzuki-gsz-s-750-back-right-side',
          'rent-a-suzuki-gsz-s-750-engine ',
          'rent-a-suzuki-gsz-s-750-back-side',
          'rent-a-suzuki-gsz-s-750-front-side',
          'rent-a-suzuki-gsz-s-750-front-left-side',
          'rent-a-suzuki-gsz-s-750-left-side',
          'rent-a-suzuki-gsz-s-750-back-left-side',
        ],
      },
      {
        id: 33, //rent-a-harley-davidson-sportster-iron-883
        altTexts: [
          'rent-a-harley-davidson-sportster-iron-883-black-front-right-side',
          'rent-a-harley-davidson-sportster-iron-883-black-back-right-side',
          'rent-a-harley-davidson-sportster-iron-883-black-back-side',
          'rent-a-harley-davidson-sportster-iron-883-black-front-left-side',
          'rent-a-harley-davidson-sportster-iron-883-black-front-side',
          'rent-a-harley-davidson-sportster-iron-883-black-left-side',
          'rent-a-harley-davidson-sportster-iron-883-black-back-left-side',
        ],
      },
      {
        id: 29, //rent-a-harley-davidson-sportster-iron-883-custom
        altTexts: [
          'rent-a-harley-davidson-sportster-iron-883-custom-front-right-side',
          'rent-a-harley-davidson-sportster-iron-883-custom-back-right-side',
          'rent-a-harley-davidson-sportster-iron-883-custom-back-side',
          'rent-a-harley-davidson-sportster-iron-883-custom-front-left-side',
          'rent-a-harley-davidson-sportster-iron-883-custom-front-side',
          'rent-a-harley-davidson-sportster-iron-883-custom-left-side',
          'rent-a-harley-davidson-sportster-iron-883-custom-back-left-side',
        ],
      },
      {
        id: 47, //rent-a-harley-davidson-sportster-xl-883c-custom
        altTexts: [
          'rent-a-harley-davidson-sportster-xl-883c-right-side',
          'rent-a-harley-davidson-sportster-xl-883c-passenger-seat-right-side',
          'rent-a-harley-davidson-sportster-xl-883c-single-driver-seat-right-side',
          'rent-a-harley-davidson-sportster-xl-883c-passenger-seat-front-right-side',
          'rent-a-harley-davidson-sportster-xl-883c-single-driver-seat-front-right-side',
          'rent-a-harley-davidson-sportster-xl-883c-engine',
          'rent-a-harley-davidson-sportster-xl-883c-seat-back-rest',
          'rent-a-harley-davidson-sportster-xl-883c-left-side',
          'rent-a-harley-davidson-sportster-xl-883c-back-left-side',
        ],
      },
      {
        id: 31, //rent-a-suzuki-tu250x
        altTexts: [
          'rent-a-suzuki-tu250x-motorcycle-front-right-side',
          'rent-a-suzuki-tu250x-motorcycle-back-right-side',
          'rent-a-suzuki-tu250x-motorcycle-front-right-side',
          'rent-a-suzuki-tu250x-motorcycle-left-side',
          'rent-a-suzuki-tu250x-motorcycle-front-left-side',
          'rent-a-suzuki-tu250x-motorcycle-back-left-side',
          'rent-a-suzuki-tu250x-motorcycle-diver-seat',
        ],
      },
      {
        id: 44, //rent-a-yamaha-r3
        altTexts: [
          'rent-a-yamaha-r3-motorcycle-front-right-side',
          'rent-a-yamaha-r3-motorcycle-back-right-side',
          'rent-a-yamaha-r3-motorcycle-engine',
          'rent-a-yamaha-r3-motorcycle-front-side',
          'rent-a-yamaha-r3-motorcycle-front-left-side',
          'rent-a-yamaha-r3-motorcycle-left-side',
          'rent-a-yamaha-r3-motorcycle-back-left-side',
          'rent-a-yamaha-r3-motorcycle-wheel-close-up',
          'rent-a-yamaha-r3-motorcycle-back-side',
        ],
      },
      {
        id: 42, // rent-a-bmw-g310r
        altTexts: [
          'rent-a-bmw-310r-motorcycle-front-right-side',
          'rent-a-bmw-310r-motorcycle-back-right-side',
          'rent-a-bmw-310r-motorcycle-back-side',
          'rent-a-bmw-310r-motorcycle-left-side',
          'rent-a-bmw-310r-motorcycle-front-side ',
          'rent-a-bmw-310r-motorcycle-front-left-side',
          'rent-a-bmw-310r-motorcycle-back-left-side',
        ],
      },
      {
        id: 27, //rent-a-honda-ruckus
        altTexts: [
          'rent-a-honda-ruckus-50cc-motorcycle-back-right-side',
          'rent-a-honda-ruckus-50cc-motorcycle-back-side',
          'rent-a-honda-ruckus-50cc-motorcycle-front-left-side',
          'rent-a-honda-ruckus-50cc-motorcycle-front-side',
          'rent-a-honda-ruckus-50cc-motorcycle-front-right-side',
          'rent-a-honda-ruckus-50cc-motorcycle-dash',
          'rent-a-honda-ruckus-50cc-motorcycle-driver-seat',
          'rent-a-honda-ruckus-50cc-motorcycle-stand',
        ],
      },
      {
        id: 40, //rent-a-vitacci-bullet-50cc
        altTexts: [
          'rent-a-vitacci-bullet-50cc-motorcycle-front-right-side',
          'rent-a-vitacci-bullet-50cc-motorcycle-back-right-side',
          'rent-a-vitacci-bullet-50cc-motorcycle-back-side',
          'rent-a-vitacci-bullet-50cc-motorcycle-left-side',
          'rent-a-vitacci-bullet-50cc-motorcycle-back-left-side',
          'rent-a-vitacci-bullet-50cc-motorcycle-front-left-side',
          'rent-a-vitacci-bullet-50cc-motorcycle-front-side',
        ],
      },
      {
        id: 88, //rent-a-vespa-sprint-50-red  | stage: 81
        altTexts: [
          'rent-a-vespa-sprint-50-motorcycle-front-right-side',
          'rent-a-vespa-sprint-50-motorcycle-back-side',
          'rent-a-vespa-sprint-50-motorcycle-storage',
          'rent-a-vespa-sprint-50-motorcycle-front-left-side',
          'rent-a-vespa-sprint-50-motorcycle-back-left-side',
          'rent-a-vespa-sprint-50-motorcycle-front-side',
          'rent-a-vespa-sprint-50-motorcycle-left-side',
        ],
      },
      {
        id: 53, //rent-a-vespa-lx-50-red
        altTexts: [
          'rent-a-vespa-lx-50-motorcycle-red-front-right-side',
          'rent-a-vespa-lx-50-motorcycle-red-back-right-side',
          'rent-a-vespa-lx-50-motorcycle-red-storage',
          'rent-a-vespa-lx-50-motorcycle-red-back-side',
          'rent-a-vespa-lx-50-motorcycle-red-back-left-side',
          'rent-a-vespa-lx-50-motorcycle-red-front-left-side',
          'rent-a-vespa-lx-50-motorcycle-red-logo-side',
          'rent-a-vespa-lx-50-motorcycle-red-front-side',
        ],
      },
      {
        id: 87, //rent-a-vespa-lx-50-yellow | stage: 80
        altTexts: [
          'rent-a-vespa-lx-50cc-motorcycle-yellow-front-right-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-back-right-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-front-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-storage',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-front-left-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-back-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-back-left-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-left-side',
          'rent-a-vespa-lx-50cc-motorcycle-yellow-back-right-side',
        ],
      },
      {
        id: 45, //rent-a-italica-mini-50cc
        altTexts: [
          'rent-a-italia-mini-50cc-yellow-motorcycle-front-right-side',
          'rent-a-italia-mini-50cc-yellow-motorcycle-back-right-side',
          'rent-a-italia-mini-50cc-yellow-motorcycle-front-side',
          'rent-a-italia-mini-50cc-yellow-motorcycle-dash',
          'rent-a-italia-mini-50cc-yellow-motorcycle-back-side',
          'rent-a-italia-mini-50cc-yellow-motorcycle-left-side',
          'rent-a-italia-mini-50cc-yellow-motorcycle-back-storage',
          'rent-a-italia-mini-50cc-yellow-motorcycle-seat-storage',
          'rent-a-italia-mini-50cc-yellow-motorcycle-front-left-side',
        ],
      },
      {
        id: 49, //rent-a-italica-mini-49cc-scooter-blue
        altTexts: [
          'rent-a-italia-mini-50cc-blue-motorcycle-back-right-side',
          'rent-a-italia-mini-50cc-blue-motorcycle-back-storage',
          'rent-a-italia-mini-50cc-blue-motorcycle-dash',
          'rent-a-italia-mini-50cc-blue-motorcycle-front-side',
          'rent-a-italia-mini-50cc-blue-motorcycle-seat-storage',
          'rent-a-italia-mini-50cc-blue-motorcycle-front-left-side',
        ],
      },
      {
        id: 50, //rent-a-italica-age-50cc
        altTexts: [
          'rent-a-italia-age-50cc-red-motorcycle-front-right-side',
          'rent-a-italia-age-50cc-red-motorcycle-back-right-side',
          'rent-a-italia-age-50cc-red-motorcycle-front-side',
          'rent-a-italia-age-50cc-red-motorcycle-seat-storage',
          'rent-a-italia-age-50cc-red-motorcycle-more-seat-storage',
          'rent-a-italia-age-50cc-red-motorcycle-back-side',
          'rent-a-italia-age-50cc-red-motorcycle-left-side',
          'rent-a-italia-age-50cc-red-motorcycle-front-left-side',
        ],
      },
      // { id: 60, altTexts: [] },
    ];
    const result = await Promise.all(
      bulks.map(
        async (item) =>
          await this.updateBikeMediaItemsByData(item.id, item.altTexts),
      ),
    );

    return result;
  }

  @Post('/:id/updateBikeTypes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Script to update Bikes' })
  public async updateBikeTypes(): Promise<any> {
    const bikeTypes = await this.connection.query('SELECT * FROM bike_types');

    const altTexts = [
      'sport-bikes-for-rent',
      'standard-motorcycles-for rent',
      'scooter-rentals',
      'touring-motorcycles-for-rent',
      'street-motorcycles-for-rent',
      'naked-motorcycles-for-rent',
    ];
    const imgIds = bikeTypes.map((el) => el.media_item_id);

    if (imgIds.length !== altTexts.length) {
      return 'Not matched ids and alt texts';
    }

    let query = `
      UPDATE media_items
      SET alt = CASE id `;
    imgIds.forEach((id, index) => {
      query += `WHEN ${id} THEN '${altTexts[index]}' `;
    });
    query += 'END WHERE id IN (' + imgIds.join(',') + ')';
    const result = await this.connection.query(query);

    return result;
  }

  @Post('/:id/updateBikeBrands')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Script to update Bikes' })
  public async updateBikeBrands(): Promise<any> {
    const bikeBrands = await this.connection.query(
      'SELECT * FROM bike_brands WHERE media_item_id IS NOT NULL',
    );

    const altTexts = [
      'bmw-motorcycle-rentals',
      'harley-davidsion-rentals',
      'ducati-motorcycle-rentals',
      'suzuki-motorcycle-rentals',
      'honda-motorcycle-rentals',
      'indian-motorcycle-rentals',
      'yamaha-motorcycle-rentals',
    ];
    const imgIds = bikeBrands.map((el) => el.media_item_id);

    if (imgIds.length !== altTexts.length) {
      return 'Not matched ids and alt texts';
    }

    let query = `
      UPDATE media_items
      SET alt = CASE id `;
    imgIds.forEach((id, index) => {
      query += `WHEN ${id} THEN '${altTexts[index]}' `;
    });
    query += 'END WHERE id IN (' + imgIds.join(',') + ')';
    const result = await this.connection.query(query);

    return result;
  }
}
