import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postsService.createPost(body);
  }

  @Get()
  findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findPostId(@Param('id') id: string) {
    return this.postsService.findPostId(+id);
  }

  @Patch(':id')
  updatePostId(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePostId(+id, updatePostDto);
  }

  @Delete(':id')
  removePostId(@Param('id') id: string) {
    return this.postsService.removePostId(+id);
  }
}
