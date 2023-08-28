import { PrismaService } from "src/prisma/prisma.service";
import { faker } from '@faker-js/faker';


export class MediasFactory {
  static async build(prisma: PrismaService) {
    return await prisma.media.create({
      data: {
        title: faker.company.name(),
        username: faker.person.firstName(),
      },
    });
  }
}

export class PostsFactory {
  static async build(prisma: PrismaService) {
    return await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        text: faker.internet.url(),
        image: faker.internet.url(),
      },
    });
  }
}

export class PublicationsFactory {
  static async build(prisma: PrismaService) {
    const post = await PostsFactory.build(prisma);
    const media = await MediasFactory.build(prisma);
    const date = new Date(2024, 2, 2);

    return await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: date,
      },
    });
  }
}