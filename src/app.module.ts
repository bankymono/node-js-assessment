import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { LocationModule } from './location/location.module';
import { EpisodeModule } from './episode/episode.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [CharacterModule, LocationModule, EpisodeModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
