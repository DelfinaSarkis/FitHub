import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./Comentarios.service";
import { Comentarios } from "./Comentarios.entity";
import { UUID } from "crypto";
import { CommentDto } from "./Comentario.dto";

@ApiTags('Comentarios')
@Controller('comentarios')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}

    @Get()
    async getComments(): Promise<Comentarios[]>{
        return await this.commentsService.getComments();
    }

    @Get(':id')
    async getCommentsById(@Param('id') id:UUID){
        return await this.commentsService.getCommentsById(id);
    }

    @Post()
    async createComments(@Body() comment: CommentDto){
        return await this.commentsService.createComments(comment);
    }

    @Put(':id')
    async updateComment(@Body() comment: CommentDto, @Param('id') id:UUID){
        return await this.commentsService.updateComment(comment, id);
    }

    @Delete(':id')
    async deleteComment(@Param('id') id:string){
        return this.commentsService.deleteComment(id);
    }
}