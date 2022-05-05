import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EpisodeDto } from './dto/episode.dto';

@Injectable()
export class EpisodeService {
  constructor(private prisma: PrismaService) {}
  async createEpisode(episodeDto: EpisodeDto) {
    const episode = await this.prisma.episode.create({
      data: episodeDto,
    });

    return episode;
  }
  getEpisodes() {
    return this.prisma.episode.findMany({
      orderBy: {
        releaseDate: 'asc',
      },
      include: {
        episodeComments: true,
        characters: true,
      },
    });
  }

  updateEpisodeWithCharacter(id: number, characterId: number) {
    return this.prisma.episode.update({
      data: {
        characters: { connect: { id: characterId } },
      },
      where: { id },
      include: {
        characters: true,
      },
    });
  }

  getEpisodesByCharacter(characterId: number) {
    return this.prisma.episode.findMany({
      where: {
        characters: {
          every: {
            id: characterId,
          },
        },
      },
    });
  }
}
