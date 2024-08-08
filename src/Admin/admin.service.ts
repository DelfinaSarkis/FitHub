import { Injectable } from "@nestjs/common";
import { AdminRepository } from "./admin.Repository";

@Injectable()
export class AdminService {
    constructor(private readonly adminRepository:AdminRepository) {}
    async solicitudCoach(id:string) {
        return await this.adminRepository.solicitudCoach(id);
    }

    async aceptarSolicitud(id:string, coach:string) {
        return await this.adminRepository.aceptarSolicitud(id, coach);
    }
    
}