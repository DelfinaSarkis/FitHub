import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.Repository";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository:AdminRepository) {}
    async solicitudPending(id:string) {
        return await this.adminRepository.solicitudPending(id);
    }

    async responderSolicitud(id:string, respuesta, coach?:string[], plan?:string[], rutina?:string[]) {
        if(coach.length > 0) {
            if(respuesta === 'aceptar') {
                for (const profe of coach) {
                    return await this.adminRepository.aceptarSolicitud(id, profe);
                }
            }
            if(respuesta === 'corregir') {
                for (const profe of coach) {
                    return await this.adminRepository.corregirSolicitud(id, profe);
                }
            }
            if(respuesta === 'denegar') {
                for (const profe of coach) {
                    return await this.adminRepository.denegarSolicitud(id, profe);
                }
            }
        } else if (plan.length > 0) {
            if(respuesta === 'aceptar') {
                for (const planRes of plan) {
                    return await this.adminRepository.aceptarSolicitud(id, planRes);
                }
            }
            if(respuesta === 'corregir') {
                for (const planRes of plan) {
                    return await this.adminRepository.corregirSolicitud(id, planRes);
                    
                }
            }
            if(respuesta === 'denegar') {
                for (const planRes of plan) {
                    return await this.adminRepository.denegarSolicitud(id, planRes);
                }
            }
        } else if (rutina.length > 0) {
            if(respuesta === 'aceptar') {
                for (const rutinaRes of rutina) {
                    return await this.adminRepository.aceptarSolicitud(id, rutinaRes);
                }
            }
            if(respuesta === 'corregir') {
                for (const rutinaRes of rutina) {
                    return await this.adminRepository.corregirSolicitud(id, rutinaRes);
                }
            }
            if(respuesta === 'denegar') {
                for (const rutinaRes of rutina) {
                    return await this.adminRepository.denegarSolicitud(id, rutinaRes);
                }
            }
        }
    }
    
}
