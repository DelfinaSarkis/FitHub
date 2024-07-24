import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.Dto';
import { UsersRepository } from './User.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getAllUsers();
  }

  getUsersById(id: string) {
    return this.usersRepository.getUserById(id);
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
