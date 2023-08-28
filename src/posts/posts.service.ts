import { Injectable } from '@nestjs/common';
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
    return await this.repository.findOnePost(id);
  }

  async updatePostId(id: number, body: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async removePostId(id: number) {
    return `This action removes a #${id} post`;
  }
}
