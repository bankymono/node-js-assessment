import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { isDate } from 'util/types';

export class EpisodeDto {
  @ApiProperty({
    type: String,
    description: 'episode name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Date,
    description: 'date of release',
  })
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({
    type: String,
    description: 'episode code',
  })
  @IsNotEmpty()
  episodeCode: string;
}
