import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.Repository";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository:AdminRepository) {}
    async solicitudCoach(id:string) {
        return await this.adminRepository.solicitudCoach(id);
    }

    async responderSolicitud(id:string, respuesta, coach?:string, plan?:string, rutina?:string) {
        if(coach){
            if(respuesta === 'aceptar') {
                return await this.adminRepository.aceptarSolicitud(id, coach);
            }
            if(respuesta === 'corregir') {
                return await this.adminRepository.corregirSolicitud(id, coach);
            }
            if(respuesta === 'denegar') {
                return await this.adminRepository.denegarSolicitud(id, coach);
            }
        } else if (plan) {
            if(respuesta === 'aceptar') {
                return await this.adminRepository.aceptarSolicitud(id, plan);
            }
            if(respuesta === 'corregir') {
                return await this.adminRepository.corregirSolicitud(id, plan);
            }
            if(respuesta === 'denegar') {
                return await this.adminRepository.denegarSolicitud(id, plan);
            }
        } else if (rutina) {
            if(respuesta === 'aceptar') {
                return await this.adminRepository.aceptarSolicitud(id, rutina);
            }
            if(respuesta === 'corregir') {
                return await this.adminRepository.corregirSolicitud(id, rutina);
            }
            if(respuesta === 'denegar') {
                return await this.adminRepository.denegarSolicitud(id, rutina);
            }
        }
    }
    
}