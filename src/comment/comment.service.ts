import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
  async createComment(commentDto: CommentDto) {
    const comment = await this.prisma.comment.create({
      data: commentDto,
    });

    return comment;
  }
  getComments() {
    return this.prisma.comment.findMany({
      orderBy: {
        created: 'desc',
      },
      include: {
        episode: true,
      },
    });
  }
}
