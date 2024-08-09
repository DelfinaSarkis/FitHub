import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "src/Guard/AuthGuar.guard";
import { resEnum } from "./resEnum";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles, UserRole } from "src/User/User.enum";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService) {}

    @Get('solicitudes')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async solicitudCoach(@Req() req){
        return await this.adminService.solicitudCoach(req.user.sub);
    }

    @Post('solicitudCoach')
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)    
    async aceptarSolicitud(@Req() req, @Query('respuesta') respuesta: resEnum, @Query('coach')coach?: string, @Query('plan')plan?: string, @Query('rutina')rutina?: string){
        return await this.adminService.responderSolicitud(req.user.sub, respuesta, coach, plan, rutina);
    }
    
}