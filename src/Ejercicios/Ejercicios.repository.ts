import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from './Ejercicios.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { EjercicioDto } from './CreateEjercicio.dto';
import { Users } from 'src/User/User.entity';

export class EjercicioRepository {
  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,@InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getEjercicios() {
    return await this.ejercicioRepository.find();
  }

  async getEjercicioById(id) {
    return await this.ejercicioRepository.findOne({ where: { id } });
  }

  async createEjercicio(ejercicio:EjercicioDto,userId:string) {

    const exercise = await this.ejercicioRepository.create(ejercicio);

    const usuarioAdmin = await this.userRepository.findOne({ where: { id: userId } });

    exercise.user = usuarioAdmin;

    return await this.ejercicioRepository.save(exercise);
    
  }

  async updateEjercicio(ejercicio, id) {
    await this.ejercicioRepository.update(id, ejercicio);
    return 'El ejercicio se ha actualizado';
  }
}
