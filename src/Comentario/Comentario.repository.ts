import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentarios } from './Comentarios.entity';
import { CommentDto } from './Comentario.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comentarios)
    private readonly commentsRepository: Repository<Comentarios>,
  ) {}

  async getAllComments() {
    return this.commentsRepository.find({ where: { isActive: true } });
  }

  async getCommentById(id: string) {
    return await this.commentsRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async createComment(comment: CommentDto) {
    await this.commentsRepository.save(comment);
    return 'Comentario creado';
  }

  async updateComment(comment: CommentDto, id: string) {
    const existingComment = await this.commentsRepository.findOneBy({
      id,
      isActive: true,
    });
    if (!existingComment) {
      throw new Error('Comentario no econtrado');
    }
    await this.commentsRepository.update(id, comment);
    const commentUpdate = await this.commentsRepository.findOneBy({ id });
    return commentUpdate;
  }

  async deleteComment(id: string) {
    const deletedComment = await this.commentsRepository.findOneBy({ id });
    if (!deletedComment || deletedComment.isActive === false) {
      throw new Error('Comentario no encontrado');
    }
    await this.commentsRepository.update(id, {
      ...deletedComment,
      isActive: false,
    });
    return id;
  }
}
