import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly repository: PublicationsRepository) {}


  async create(body: CreatePublicationDto) {
    const post = await this.repository.checkPost(body.postId);
    if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    const media = await this.repository.checkMedia(body.mediaId);
    if(!media) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return await this.repository.createPublication(body);
  }

  async findAll(date?: Date, published?: boolean) {
    return await this.repository.findAllPublications(published, date);
  }

  async findOne(id: number) {
    return await this.repository.findOnePublication(id);
  }

  async update(id: number, body: UpdatePublicationDto) {
    const media = await this.repository.checkMedia(body.mediaId);
    const post = await this.repository.checkPost(body.postId);
    const publication = await this.repository.findOnePublication(id);
    if(publication.date < new Date()) throw new HttpException('cannot update a publication', HttpStatus.FORBIDDEN)
    if(!post || media || publication) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    return await this.repository.updatePublication(id, body);
  }

  async remove(id: number) {
    return await this.repository.removePublication(id);
  }
}
