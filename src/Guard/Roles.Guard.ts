import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/User/User.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if(!roles){
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const userRole = request.user?.roles;

        if(!userRole){
            throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
        }

        const hasRole = () =>
            roles.some((role) => userRole.includes(role));

        const valid = hasRole();
        if(!valid){
            throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
        }
        
        return valid;
    }
}