import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { isDate } from 'util/types';

export class CommentDto {
  @ApiProperty({
    type: String,
    description: 'comment content',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    type: String,
    description: 'the ip address of the person commenting',
  })
  @IsNotEmpty()
  ipAddressLocation: string;

  @ApiProperty({
    type: Number,
    description: 'the id of the episode to comment',
  })
  @IsNotEmpty()
  episodeId: number;
}
