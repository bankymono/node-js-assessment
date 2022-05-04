import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post()
  createCharacters(){
    return 'characters created';
  }

  @Get()
  getCharacters() {
    return 'I am characters';
  }


}
