import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './User.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './CreateUser.Dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getAllUsers() {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async getUserById(id: string) {
    const userFinded = await this.userRepository.findOneBy({ id });
    return userFinded;
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userRepository.save(user);
    return createdUser.id;
  }

  async updateUser(user: UpdateUserDto, id: string) {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });

    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.findOneBy({ id });
    this.userRepository.remove(deletedUser);
    return id;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
