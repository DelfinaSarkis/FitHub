import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/Guard/AuthGuar.guard";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService) {}

    @Get('solicitudCoach')
    @UseGuards(AuthGuard)
    async solicitudCoach(@Req() req){
        return await this.adminService.solicitudCoach(req.user.sub);
    }

    @Post('aceptarSolicitud')
    @UseGuards(AuthGuard)
    async aceptarSolicitud(@Req() req, coach: string){
        return await this.adminService.aceptarSolicitud(req.user.sub, coach);
    }
    
}