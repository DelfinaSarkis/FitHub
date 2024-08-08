import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/Guard/AuthGuar.guard";
import { resEnum } from "./resEnum";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService) {}

    @Get('solicitudCoach')
    @UseGuards(AuthGuard)
    async solicitudCoach(@Req() req){
        return await this.adminService.solicitudCoach(req.user.sub);
    }

    @Post('solicitudCoach')
    @UseGuards(AuthGuard)
    async aceptarSolicitud(@Req() req, @Query('respuesta') respuesta: resEnum, coach: string){
        return await this.adminService.aceptarSolicitud(req.user.sub, coach, respuesta);
    }
    
}