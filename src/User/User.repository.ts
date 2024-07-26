import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './User.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './CreateUser.Dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getAllUsers() {
    const allUsers = await this.userRepository.find({
      where: { isActive: true },
    });
    return allUsers;
  }

  async getUserById(id) {
    return await this.userRepository.findOneBy({ id, isActive: true });
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userRepository.save(user);
    return createdUser.id;
  }

  async updateUser(user: UpdateUserDto, id: string) {
    const existingUser = await this.userRepository.findOneBy({ id });
    if(!existingUser){
      throw new Error('Usuario no encontrado');
    }
    await this.userRepository.update(id, user);
    const userUpdated = await this.userRepository.findOneBy({ id });
    return userUpdated;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.findOneBy({ id });
    if (!deletedUser || deletedUser.isActive === false) {
      throw new NotFoundException('Plan no encontrado o eliminado');
    }
    await this.userRepository.update(id, { ...deletedUser, isActive: false });
    return id;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email, isActive: true });
  }
}
