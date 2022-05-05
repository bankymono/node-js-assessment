import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum statusType {
  ACTIVE = 'ACTIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum genderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class CharacterDto {
  @ApiProperty({
    type: String,
    description: 'first name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'last name',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'status: can be either "ACTIVE", "DEAD" or "UNKNOWN"',
  })
  @IsNotEmpty()
  @IsEnum(statusType)
  status: statusType;

  @ApiProperty({
    type: String,
    description: 'state of origin: is optional',
  })
  @IsString()
  stateOfOrigin: string;

  @ApiProperty({
    type: String,
    description: 'gender: can be either "MALE" or "FEMALE"',
  })
  @IsNotEmpty()
  @IsEnum(genderType)
  gender: genderType;
}
