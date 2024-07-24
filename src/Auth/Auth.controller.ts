/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { loginDto } from "./Login.Dto";
import { AuthService } from "./Auth.Sevice";
import { CreateUserDto } from "src/User/CreateUser.Dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('signing')
    async signing(@Body() body:loginDto) {
        const {email, password} = body;
        return await this.authService.signin(email, password);
    }

    @Post('signupuser')
    async signup(@Body() body:CreateUserDto) {
        return await this.authService.signup(body);
    }

    @Post('signupentrenador')
    async signupEntrenador(@Body() body:CreateUserDto) {
        return await this.authService.signupEntrenador(body);
    }
}