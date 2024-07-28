import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.Dto';
import { UsersRepository } from './User.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getAllUsers();
  }

  getUsersById(id: string, idUser) {
    if (id === idUser) {
      return this.usersRepository.getUserById(id);
    }
    throw new BadRequestException('No tienes acceso a esta informacion');
  }

  createUser(user: CreateUserDto) {
    return this.usersRepository.createUser(user);
  }

  updateUser(user, id: string) {
    return this.usersRepository.updateUser(user, id);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
