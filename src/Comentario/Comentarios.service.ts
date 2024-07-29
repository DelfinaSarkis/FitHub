import { CommentDto } from './Comentario.dto';
import { CommentsRepository } from './Comentario.repository';

export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getComments() {
    return await this.commentsRepository.getAllComments();
  }

  async getCommentsById(id: string) {
    return await this.commentsRepository.getCommentById(id);
  }

  async createComments(comment: CommentDto) {
    await this.commentsRepository.createComment(comment);
    return comment;
  }

  async updateComment(id, comment) {
    await this.commentsRepository.updateComment(id, comment);
  }

  async deleteComment(id: string) {
    return this.commentsRepository.deleteComment(id);
  }
}
