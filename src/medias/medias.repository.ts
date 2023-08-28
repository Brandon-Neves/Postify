import { Injectable } from '@nestjs/common';
import { CreateMediaDto, UpdateMediaDto } from './dto/create-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediasRepository {

  constructor(private readonly prisma: PrismaService) {}

  async createMedia(data: CreateMediaDto) {
    return await this.prisma.media.create({data});
  }

  async checkUsernameAndTitle(body: CreateMediaDto) {
    return await this.prisma.media.findFirst({
      where: {
        title: body.title,
        username: body.username,
      },
    });
   }

   async checkUpdateUsernameAndTitle(body: UpdateMediaDto) {
    return await this.prisma.media.findFirst({
      where: {
        title: body.title,
        username: body.username,
      },
    });
   }

  async findAllMedias() {
    return await this.prisma.media.findMany({
      orderBy: {id: 'asc'}
    });
  }

  async checkFindAllMedias(id: number) {
    return await this.prisma.publication.findMany({
      where: { mediaId: id },
    });
  }

  async findOneMedia(id: number) {
    return await this.prisma.media.findFirst({
      where: { id }
    });
  }

  async updateMedia(id: number, body: UpdateMediaDto) {
    return await this.prisma.media.update({
      data: {
        title: body.title,
        username: body.username,
      },
      where: { id },
    });
  }

  async removeMedia(id: number) {
    return await this.prisma.media.delete({
      where: { id }
    });
  }
}
