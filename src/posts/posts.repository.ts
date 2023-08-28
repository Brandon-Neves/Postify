import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {

  constructor(private readonly prisma:PrismaService) {}

  async createPost(data: CreatePostDto) {
    return await this.prisma.post.create({data});
  }

  async findAllPosts() {
    return await this.prisma.post.findMany({
      orderBy: {id: 'asc'}
    });
  }

  async findOnePost(id: number) {
    return await this.prisma.post.findFirst({
      where: { id }
    });
  }

  async updatePost(id: number, data: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id }, data
    });
  }

  async removePost(id: number) {
    return await this.prisma.post.delete({
      where: { id }
    });
  }
}
