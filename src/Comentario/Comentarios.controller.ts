import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './Comentarios.service';
import { Comentarios } from './Comentarios.entity';
import { UUID } from 'crypto';
import { CommentDto } from './Comentario.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';

@ApiTags('Comentarios')
@Controller('comentarios')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getCommentsRutina(): Promise<Comentarios[]> {
    return await this.commentsService.getCommentsRutina();
  }
  @Get()
  async getCommentsPlan(): Promise<Comentarios[]> {
    return await this.commentsService.getCommentsPlan();
  }

  @Get(':id')
  async getCommentsById(@Param('id') id: UUID) {
    return await this.commentsService.getCommentsById(id);
  }

  @Post('rutina')
  @UseGuards(AuthGuard)
  async createCommentsRutina(@Body() comment: CommentDto, @Req() req) {
    const userId = req.user.sub;
    return await this.commentsService.createCommentsRutina(comment, userId);
  }
  @Post('plan')
  async createCommentsPlan(@Body() comment: CommentDto) {
    return await this.commentsService.createCommentsPlan(comment);
  }

  @Put(':id')
  async updateComment(@Body() comment: CommentDto, @Param('id') id: UUID) {
    return await this.commentsService.updateComment(comment, id);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
