import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { CharacterDto, genderType, statusType } from './dto';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The resource has been successfully created',
  })
  createCharacters(@Body() characterDto: CharacterDto) {
    return this.characterService.createCharacter(characterDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The characters list fetched successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getCharacters(
    @Query()
    userQuery: {
      gender?: genderType;
      status?: statusType;
      sort?: string;
      desc?: boolean;
    },
  ) {
    return this.characterService.getCharacters(userQuery);
  }
}
