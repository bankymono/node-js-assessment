import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { EpisodeDto } from './dto/episode.dto';

@ApiTags('episodes')
@Controller('episodes')
export class EpisodeController {
  constructor(private episodeService: EpisodeService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The resource has been successfully created',
  })
  createEpisode(@Body() episodeDto: EpisodeDto) {
    return this.episodeService.createEpisode(episodeDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The episodes list fetched successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getEpisodes() {
    return this.episodeService.getEpisodes();
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Successfully updated episode with character' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updateEpisodesByCharacter(
    @Body() characterObj: { characterId: number },
    @Param('id', ParseIntPipe) episodeId,
  ) {
    return this.episodeService.updateEpisodeWithCharacter(
      Number(episodeId),
      characterObj.characterId,
    );
  }

  @Get('/search')
  @ApiOkResponse({
    description: 'The episodes list by character fetched successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getEpisodesByCharacter(@Query() charQuery: { characterId: string }) {
    return this.episodeService.getEpisodesByCharacter(
      Number(charQuery.characterId),
    );
  }
}
