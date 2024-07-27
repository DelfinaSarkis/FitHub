import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comentarios } from "./Comentarios.entity";
import { CommentsController } from "./Comentarios.controller";
import { CommentsRepository } from "./Comentario.repository";
import { CommentsService } from "./Comentarios.service";

@Module({
    imports: [TypeOrmModule.forFeature([Comentarios])],
    controllers: [CommentsController],
    providers: [CommentsRepository, CommentsService],
})
export class commentsModule {}