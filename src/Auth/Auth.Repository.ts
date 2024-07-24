import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { Users } from 'src/User/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/User/User.enum';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  async signin(email: string, password: string): Promise<object> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Email o password incorrectos');
    }

    const validarPass = await bcrypt.compare(password, user.password);

    if (!validarPass) {
      throw new NotFoundException('Email o password incorrectos');
    }

    const payload = { email: user.email, sub: user.id, role: user.isAdmin };

    const token = this.jwtService.sign(payload);

    return { token: token };
  }

  async signup(body: CreateUserDto): Promise<string> {
    const usuario = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (usuario) {
      throw new BadRequestException('El usuario ya existe');
    }
    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    const passHash = await bcrypt.hash(body.password, 10);
    body.password = passHash;
    const user = await this.usersRepository.create(body);
    await this.usersRepository.save(user);
    return 'Usuario creado';
  }

  async signupEntrenador(body: CreateUserDto): Promise<string> {
    const usuario = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (usuario) {
      throw new BadRequestException('El usuario ya existe');
    }
    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    const passHash = await bcrypt.hash(body.password, 10);

    const user = await this.usersRepository.create({
      ...body,
      isAdmin: UserRole.ENTRENADOR,
      password: passHash,
    });
    await this.usersRepository.save(user);
    return 'Entrenador creado';
  }
}
