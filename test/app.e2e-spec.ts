import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediasFactory, PostsFactory, PublicationsFactory } from './factory/factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let postsFactory: PostsFactory;
  let mediaFactory: MediasFactory;
  let publicationFactory: PublicationsFactory;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        PrismaModule,
        PublicationsFactory,
        PostsFactory,
        MediasFactory,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
    mediaFactory = app.get(MediasFactory);
    postsFactory = app.get(PostsFactory);
    publicationFactory = app.get(PublicationsFactory);
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });
  describe('MediaController (e2e)', () => {
    it('/medias (GET)', async () => {
      return await request(app.getHttpServer())
      .get('/medias')
      .expect(200)
      .expect([]);
    });
    it('/medias (POST)', async () => {
      return await request(app.getHttpServer())
      .post('/medias')
      .send({title: 'test1', username: 'test2'})
      .expect(201);
    });
    it('/medias/:id (GET)', async () => {
      const media = await prisma.media.create({
        data: {
          title: 'test1',
          username: 'test1',
        },
      });
      return request(app.getHttpServer()).get(`/medias/${media.id}`).expect(200);
    });
    it('/medias/:id (PUT)', async () => {
      const media = await prisma.media.create({
        data: {
          title: 'test1',
          username: 'teste2',
        },
      });
      return request(app.getHttpServer())
      .put(`/medias/${media.id}`)
      .send({
        title: 'test1',
        username: 'test2',
      })
      .expect(200);
    });
    it('/medias/:id (DELETE)', async () => {
      const media = await prisma.media.create({
        data: {
          title: 'teste1',
          username: 'teste2',
        },
      });
      return request(app.getHttpServer())
      .delete(`/medias/${media.id}`)
      .expect(200);
    });
  })
});

