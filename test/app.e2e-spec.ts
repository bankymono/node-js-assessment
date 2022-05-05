import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { CharacterDto, genderType, statusType } from '../src/character/dto';
import { EpisodeDto } from 'src/episode/dto/episode.dto';
import { CommentDto } from 'src/comment/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Api Tests', () => {
    const characterDto: CharacterDto = {
      firstName: 'Ayomide',
      lastName: 'Bankole',
      status: statusType.ACTIVE,
      stateOfOrigin: 'Ogun',
      gender: genderType.FEMALE,
    };
    const episodeDto: EpisodeDto = {
      name: 'Pick a Career',
      releaseDate: new Date(),
      episodeCode: '0125',
    };

    const commentDto: CommentDto = {
      comment: 'nice episode',
      ipAddressLocation: '192.168.7.200',
      episodeId: 1,
    };

    describe('Create character', () => {
      it('should create a character', () => {
        return pactum
          .spec()
          .post('/characters')
          .withBody(characterDto)
          .expectStatus(201)
          .inspect()
          .stores('characterId', 'id');
      });
    });
    describe('get all characters', () => {
      it('should get all characters', () => {
        return pactum.spec().get('/characters').expectStatus(200);
      });
    });
    describe('get episodes of a character - sort by releaseDate, from old to new, list episode with comment count', () => {
      it('should create an episode', () => {
        return pactum
          .spec()
          .post('/episodes')
          .withBody(episodeDto)
          .expectStatus(201)
          .stores('episodeId', 'id');
      });
    });
    describe('get all episodes', () => {
      it('should get all episodes', () => {
        return pactum.spec().get('/episodes').expectStatus(200);
      });
    });
    describe('create a comment', () => {
      it('should create a comment', () => {
        return pactum
          .spec()
          .post('/comments')
          .withBody({ ...commentDto, episodeId: '$S{episodeId}' })
          .expectStatus(201);
      });
    });
    describe('get all comments', () => {
      it('should get all comments', () => {
        return pactum.spec().get('/comments').expectStatus(200);
      });
    });
  });
});
