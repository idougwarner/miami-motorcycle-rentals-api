import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WPMigrationService } from './wp-migration.service';

@Controller('wp-migration')
@ApiTags('WP Migration Controller')
export class WPMigrationController {
  constructor(private wpMigrationService: WPMigrationService) {}

  // @Post('/start')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Migration WP db to nestjs db',
  })
  public async initialOrder(): Promise<{}> {
    const result = await this.wpMigrationService.migrate();
    return { status: 200, result: result };
  }
}
