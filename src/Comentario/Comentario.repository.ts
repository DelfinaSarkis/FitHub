import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentarios } from './Comentarios.entity';
import { CommentDto } from './Comentario.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { EstadoComentario } from './EstadoComentario.Enum';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comentarios)
    private readonly commentsRepository: Repository<Comentarios>,
  ) {}

  async getCommentsRutina(page: number, limit: number) {
    return this.commentsRepository.find({
      where: {
        isActive: true,
        routine: { id: Not(IsNull()) },
        plan: IsNull(),
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['routine'],
    });
  }

  async getCommentsRevision() {
    return this.commentsRepository.find({
      where: { state: EstadoComentario.OBSERVADO },
    });
  }

  async getCommentsPlan(page: number, limit: number) {
    return this.commentsRepository.find({
      where: { isActive: true, plan: { id: Not(IsNull()) }, routine: IsNull() },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['plan'],
    });
  }

  async getCommentById(id: string) {
    return await this.commentsRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async createCommentsRutina(comment: CommentDto) {
    const comentarioRegistrado = await this.commentsRepository.save(comment);
    return comentarioRegistrado;
  }
  async createCommentsPlan(comment: CommentDto) {
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

    const updateData = {
      description: comment.description,
      score: comment.score,
      routine: comment.routine,
      plan: comment.plan,
    };

    await this.commentsRepository.update(id, updateData);
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
