import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediasRepository {

  constructor(private readonly prisma: PrismaService) {}

  async createMedia(data: CreateMediaDto) {
    return await this.prisma.media.create({data});
  }

  async findAllMedias() {
    return await this.prisma.media.findMany({
      orderBy: {id: 'asc'}
    });
  }

  async findOneMedia(id: number) {
    return await this.prisma.media.findFirst({
      where: { id }
    });
  }

  async updateMedia(id: number, data: UpdateMediaDto) {
    return await this.prisma.media.update({
      where: { id }, data
    });
  }

  async removeMedia(id: number) {
    return await this.prisma.media.delete({
      where: { id }
    });
  }
}
