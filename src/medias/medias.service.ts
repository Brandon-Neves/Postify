import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto, UpdateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository
    ) {}

  async create(body: CreateMediaDto) {
    const checkUserAndTitle = this.repository.checkUsernameAndTitle(body);
    if(checkUserAndTitle) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    return this.repository.createMedia(body);
  }

  async findAll() {
    return await this.repository.findAllMedias();
  }

  async findOne(id: number) {
    const media = await this.repository.findOneMedia(id);
    if(!media) throw new HttpException('Media not found', HttpStatus.NOT_FOUND)
    return await this.repository.findOneMedia(id);;
  }

  async update(id: number, body: UpdateMediaDto) {
    const media = await this.repository.findOneMedia(id);
    if(!media) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    const checkUserAndTitle = this.repository.checkUpdateUsernameAndTitle(body);
    if(checkUserAndTitle) throw new HttpException('Conflict', HttpStatus.CONFLICT);
    return await this.repository.updateMedia(id, body);
  }

  async remove(id: number) {
    const media = await this.repository.findOneMedia(id);
    if(!media) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    const checkMediaPublications = await this.repository.checkFindAllMedias(id);
    if(checkMediaPublications.length > 0) throw new HttpException("you don't have permission to access", HttpStatus.FORBIDDEN)
    return await this.repository.removeMedia(id);
  }
}
