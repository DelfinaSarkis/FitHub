import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly filesUploadRepository: FilesUploadService,
    @InjectRepository(Ejercicio)
    private readonly ejerciciosRepository: Repository<Ejercicio>,
  ) {}

  async uploadImage(file: Express.Multer.File, ejercicioId: string) {
    const ejercicioImageUpload = await this.ejerciciosRepository.findOneBy({
      id: ejercicioId,
    });
    if (!ejercicioImageUpload) {
      throw new NotFoundException('Ejercicio no encontrado');
    }
    const upLoadImage = await this.filesUploadRepository.uploadImage(file);
    if (!upLoadImage.secure_url) {
      throw new NotFoundException('No se pudo cargar la imagen');
    }
    await this.ejerciciosRepository.update(ejercicioId, {
      imgUrl: upLoadImage.secure_url,
    });

    const updateEjercicio = await this.ejerciciosRepository.findOneBy({
      id: ejercicioId,
    });
    if (!updateEjercicio) {
      throw new NotFoundException('No se pudo actualizar la imagen');
    }
    return updateEjercicio;
  }
}
