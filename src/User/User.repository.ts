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
  async getUserByIdPyR(id) {
    const userRyP = await this.userRepository.findOne({
      where: { id, isActive: true },
      select: ['id'],
      relations: ['routine', 'subsciption'],
    });

    return {
      id: userRyP.id,
      routine: userRyP.routine,
      subsciption: userRyP.subsciption,
    };
  }

  async getEntrenadorByIdPyR(id) {
    const entrenadorRyP = await this.userRepository.findOne({
      where: { id, isActive: true },
      select: ['id'],
      relations: ['routineAdmin', 'planAdmin', 'exercise'],
    });

    return {
      id: entrenadorRyP.id,
      routineAdmin: entrenadorRyP.routineAdmin,
      planAdmin: entrenadorRyP.planAdmin,
      exercise: entrenadorRyP.exercise,
    };
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userRepository.save(user);
    return createdUser.id;
  }

  async updateUser(user: UpdateUserDto, id: string) {
    //let updatedUser = await this.userRepository.findOneBy({ id });
    const userUpdated = await this.userRepository.update(id, user);

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
