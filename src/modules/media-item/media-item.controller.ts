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
import { MediaCreateRequestDto } from 'src/shared/dtos/media/media-create-request.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { MediaTransformRequestDto } from 'src/shared/dtos/media/media-transform-request.dto';

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
  public async createMedia(
    @Body() body: MediaCreateRequestDto,
  ): Promise<{ featuredMediaItem: MediaItem; galleryMediaItems: MediaItem[] }> {
    const featuredImageFile = body.featureImageFile;
    const galleryImageFiles = body.galleryImageFiles;

    return await this.mediaItemService.create(
      body.featureImage,
      body.galleryImages,
      featuredImageFile,
      galleryImageFiles,
    );
  }

  @Post('/transform')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: MediaTransformRequestDto })
  @ApiOperation({
    summary: 'Create media items',
  })
  public async transformMediaItems(@Body() body: MediaTransformRequestDto) {
    return await this.mediaItemService.transformMediaItems(body);
  }
}
