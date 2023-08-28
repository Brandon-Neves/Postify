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

  async findAllPublications() {
    return await this.prisma.publication.findMany({
      orderBy: {date: 'asc'}
    });
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