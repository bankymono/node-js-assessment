import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CommentDto } from './dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The resource has been successfully created',
  })
  createEpisode(@Body() commentDto: CommentDto) {
    return this.commentService.createComment(commentDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The comments list fetched successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getCharacters() {
    return this.commentService.getComments();
  }
}
