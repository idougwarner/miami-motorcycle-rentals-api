import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { MediaItemService } from './media-item.service';
import { MediaItem } from '../entity/media-item.entity';
import {
  CreateImageDto,
  MediaCreateRequestDto,
} from 'src/shared/dtos/media/media-create-request.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('media')
@ApiTags('Media Item Controller')
export class MediaItemController {
  constructor(private mediaItemService: MediaItemService) {}

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  @FormDataRequest({ storage: FileSystemStoredFile })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: MediaCreateRequestDto })
  @ApiOperation({
    summary: 'Create media items',
  })
  public async createBike(
    @Body() body: MediaCreateRequestDto,
  ): Promise<{ featuredMediaItem: MediaItem; galleryMediaItems: MediaItem[] }> {
    const featureMediaItemData: CreateImageDto = JSON.parse(
      JSON.parse(body.featureImage),
    );
    const galleryMediaItemsData: CreateImageDto[] = JSON.parse(
      JSON.parse(body.galleryImages),
    );
    const featuredImageFile = body.featureImageFile;
    const galleryImageFiles = body.galleryImageFiles;

    return await this.mediaItemService.create(
      featureMediaItemData,
      galleryMediaItemsData,
      featuredImageFile,
      galleryImageFiles,
    );
  }
}
