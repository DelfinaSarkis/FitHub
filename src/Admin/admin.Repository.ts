import { Injectable } from "@nestjs/common";
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
            throw new Error('No tienes permisos para realizar esta accion');
        }
        const user = await this.userRepository.findOne({where:{id:coach}});
        if(user.solicitud === SolicitudState.PENDING) {
            await this.userRepository.update(id, {solicitud:SolicitudState.ACCEPTED, role:UserRole.ENTRENADOR});
            await this.mailerService.notificarRegistro(user.email, 'Solicitud aceptada', 'Tu solicitud ha sido aceptada, bienvenido a FitHub');
            return 'Solicitud aceptada';
        }
        if(user.solicitud === SolicitudState.DENIED) {
            throw new Error('Ya tienes una solicitud denegada, comunicarte con la administracion');
        }
        throw new Error('No hay solicitudes pendientes');
    }

    async corregirSolicitud(id:string, coach:string) {
        const admin = await this.userRepository.findOne({where:{id}});
        if(admin.role !== 'admin') {
            throw new Error('No tienes permisos para realizar esta accion');
        }
        const user = await this.userRepository.findOne({where:{id:coach}});
        if(user.solicitud === SolicitudState.PENDING) {
            await this.userRepository.update(id, {solicitud:SolicitudState.CORRECTION});
            await this.mailerService.notificarRegistro(user.email, 'Solicitud en correccion', 'Tu perfil de entrenador es interesante, por favor corregir la docuemntancion y vuelve a realizar la solicitud');
            return 'Solicitud en correccion';
        }
        if(user.solicitud === SolicitudState.DENIED) {
            throw new Error('Solicitud denegada');
        }
        throw new Error('No hay solicitudes pendientes');
    }

    async denegarSolicitud (id:string, coach:string) {
        const admin = await this.userRepository.findOne({where:{id}});
        if(admin.role !== 'admin') {
            throw new Error('No tienes permisos para realizar esta accion');
        }
        const user = await this.userRepository.findOne({where:{id:coach}});
        if(user.solicitud === SolicitudState.PENDING) {
            await this.userRepository.update(id, {solicitud:SolicitudState.DENIED});
            await this.mailerService.notificarRegistro(user.email, 'Solicitud denegada', 'Tu solicitud ha sido denegada, comunicate con la administracion para mas informacion');
            return 'Solicitud denegada';
        }
        if(user.solicitud === SolicitudState.ACCEPTED) {
            throw new Error('Ya tenia la solicitud aceptada');
        }
        throw new Error('No hay solicitudes pendientes');
    }
}