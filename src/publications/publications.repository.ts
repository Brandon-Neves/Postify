import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationsRepository {

  constructor(private readonly prisma: PrismaService) {}



  create(data: CreatePublicationDto) {
    return this.prisma.publication.create({
      data
    });
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: number) {
    return this.prisma.publication.findUnique({
      where: { id }
    }) ;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
