import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationsRepository {

  constructor(private readonly prisma: PrismaService) {}



  async createPublication(data: CreatePublicationDto) {
    return await this.prisma.publication.create({
      data
    });
  }

  async checkPost(id: number) {
    const post = await this.prisma.post.findFirst({
      where: { id },
    });
    return post;
  }
  async checkMedia(id: number) {
    const media = await this.prisma.media.findFirst({
      where: { id },
    });
    return media;
  }

  async findAllPublications(published?: boolean, date?: Date) {
    let publications = await this.prisma.publication.findMany();
    if (published !== undefined) {
      const currentDate = new Date();
      publications = publications.filter((pub) =>
        published ? pub.date < currentDate : pub.date > currentDate,
      );
    }
    if (date) {
      publications = publications.filter((pub) => pub.date < date);
    }
    return publications;
  }

  async findOnePublication(id: number) {
    return await this.prisma.publication.findFirst({
      where: { id }
    }) ;
  }

  async updatePublication(id: number, data: UpdatePublicationDto) {
    return await this.prisma.publication.update({ 
      where: {id}, data});
  }

  async removePublication(id: number) {
    return await this.prisma.publication.delete({ 
      where: {id} });
  }
}
