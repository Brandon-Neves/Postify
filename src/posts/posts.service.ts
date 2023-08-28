import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@Injectable()
export class PostsService {

  constructor(private readonly repository: PostsRepository) {}

  async createPost(body: CreatePostDto) {
    return await this.repository.createPost(body);
  }

  async findAllPosts() {
    return await this.repository.findAllPosts();
  }

  async findPostId(id: number) {
    const post = await this.repository.findOnePost(id);
    if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    return await this.repository.findOnePost(id);
  }

  async updatePostId(id: number, body: UpdatePostDto) {
    const post = await this.repository.findOnePost(id);
    if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return await this.repository.updatePost(id, body);
  }

  async removePostId(id: number) {
    const post = await this.repository.findOnePost(id);
    if(!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    const checkPostPublications = await this.repository.checkFindAllPosts(id);
    if(checkPostPublications.length > 0) throw new HttpException("you don't have permission to access", HttpStatus.FORBIDDEN)
    return await this.repository.removePost(id);
  }
}
