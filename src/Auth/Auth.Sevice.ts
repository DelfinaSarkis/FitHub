import { Injectable } from '@nestjs/common';
import { AuthRepository } from './Auth.Repository';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { loginAuthDto } from './Login.Dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signin(email: string, password: string): Promise<object> {
    return await this.authRepository.signin(email, password);
  }

  async signup(body: CreateUserDto): Promise<string> {
    return await this.authRepository.signup(body);
  }

  async auth0(body: loginAuthDto){
    return await this.authRepository.auth0(body)
  }
  async signupEntrenador(body: CreateUserDto): Promise<string> {
    return await this.authRepository.signupEntrenador(body);
  }
}
