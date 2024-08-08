import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.Repository";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository:AdminRepository) {}
    async solicitudCoach(id:string) {
        return await this.adminRepository.solicitudCoach(id);
    }

    async aceptarSolicitud(id:string, coach:string, respuesta) {
        if(respuesta === 'aceptar') {
            return await this.adminRepository.aceptarSolicitud(id, coach);
        }
        if(respuesta === 'corregir') {
            return await this.adminRepository.corregirSolicitud(id, coach);
        }
        if(respuesta === 'denegar') {
            return await this.adminRepository.denegarSolicitud(id, coach);
        }
    }
    
}