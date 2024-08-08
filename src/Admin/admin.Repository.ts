import { BadRequestException, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailerService } from "src/mailer/mailer.service";
import { Users } from "src/User/User.entity";
import { SolicitudState, UserRole } from "src/User/User.enum";
import { UsersRepository } from "src/User/User.repository";
import { Repository } from "typeorm";

@Injectable()
export class AdminRepository {
    constructor(
        private readonly mailerService:MailerService,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,

    ) {}
    
    async solicitudCoach(id:string) {
        const admin = await this.userRepository.findOne({where:{id}});
        if(admin.role !== 'admin') {
            throw new Error('No tienes permisos para realizar esta accion');
        }
        return await this.userRepository.findOne({where:{solicitud:SolicitudState.PENDING}});
    }

    async aceptarSolicitud(id:string, coach:string) {
        const admin = await this.userRepository.findOne({where:{id}});
        if(admin.role !== 'admin') {
            throw new BadRequestException('No tienes permisos para realizar esta accion');
        }
        const user = await this.userRepository.findOne({where:{id:coach}});
        if(user.solicitud === SolicitudState.PENDING) {
            await this.userRepository.update(coach, {solicitud:SolicitudState.ACCEPTED, role:UserRole.ENTRENADOR});
            await this.mailerService.notificarRegistro(user.email, 'Solicitud aceptada', 'Tu solicitud ha sido aceptada, bienvenido a FitHub');
            return 'Solicitud aceptada';
        }
        if(user.solicitud === SolicitudState.DENIED) {
            throw new BadRequestException('Ya tienes una solicitud denegada, comunicarte con la administracion');
        }
        throw new BadRequestException('No hay solicitudes pendientes');
    }

    async corregirSolicitud(id:string, coach:string) {
        const admin = await this.userRepository.findOne({where:{id}});
        if(admin.role !== 'admin') {
            throw new BadRequestException('No tienes permisos para realizar esta accion');
        }

        const user = await this.userRepository.findOne({where:{id:coach}});
        console.log(user.solicitud, SolicitudState.CORRECTION);
        if (user.solicitud === SolicitudState.CORRECTION) {
            throw new BadRequestException('Ya esta en correccion');
        }
        if(user.solicitud === SolicitudState.PENDING) {
            await this.userRepository.update(coach, {solicitud:SolicitudState.CORRECTION});
            await this.mailerService.notificarRegistro(user.email, 'Solicitud en correccion', 'Tu perfil de entrenador es interesante. Por favor, corrige la documentación y vuelve a realizar la solicitud.');
            return 'Solicitud en correccion';
        }
        if(user.solicitud === SolicitudState.DENIED) {
            throw new BadRequestException('Solicitud denegada');
        }
        throw new BadRequestException('No hay solicitudes pendientes');
    }

    async denegarSolicitud (id:string, coach:string) {
        const admin = await this.userRepository.findOne({where:{id}});
        if(admin.role !== 'admin') {
            throw new BadRequestException('No tienes permisos para realizar esta accion');
        }
        const user = await this.userRepository.findOne({where:{id:coach}});
        if(user.solicitud === SolicitudState.PENDING) {
            await this.userRepository.update(coach, {solicitud:SolicitudState.DENIED});
            await this.mailerService.notificarRegistro(user.email, 'Solicitud denegada', 'Tu solicitud ha sido denegada, comunicate con la administracion para mas informacion');
            return 'Solicitud denegada';
        }
        if(user.solicitud === SolicitudState.ACCEPTED) {
            throw new BadRequestException('Ya tenia la solicitud aceptada');
        }
        throw new BadRequestException('No hay solicitudes pendientes');
    }
}