import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/User/User.entity";
import { SolicitudState } from "src/User/User.enum";
import { UsersRepository } from "src/User/User.repository";
import { Repository } from "typeorm";

@Injectable()
export class AdminRepository {
    constructor(
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
            await this.userRepository.update(id, {solicitud:SolicitudState.ACCEPTED});
            return 'Solicitud aceptada';
        }
        if(user.solicitud === SolicitudState.DENIED) {
            throw new Error('Solicitud denegada');
        }
        throw new Error('No hay solicitudes pendientes');
    }
}