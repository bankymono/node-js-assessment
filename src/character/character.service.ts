import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CharacterDto, genderType, statusType } from './dto';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}
  async createCharacter(characterDto: CharacterDto) {
    try {
      const character = await this.prisma.character.create({
        data: characterDto,
      });

      return character;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('character already exists');
      }
      throw error;
    }
  }
  getCharacters(userQuery: {
    gender?: genderType;
    status?: statusType;
    sort?: string;
    desc?: boolean;
  }) {
    if (
      userQuery.desc ||
      userQuery.gender ||
      userQuery.sort ||
      userQuery.status
    ) {
      return this.prisma.character.findMany({
        where: {
          OR: [
            userQuery.gender && {
              gender: {
                equals: userQuery.gender,
              },
            },
            userQuery.status && {
              status: {
                equals: userQuery.status || null,
              },
            },
          ],
        },
        orderBy: [
          userQuery.sort && {
            [userQuery.sort]: (userQuery.desc && 'desc') || 'asc',
          },
        ],
        include: {
          episodes: true,
        },
      });
    }
    return this.prisma.character.findMany({
      include: {
        episodes: true,
      },
    });
  }
}
