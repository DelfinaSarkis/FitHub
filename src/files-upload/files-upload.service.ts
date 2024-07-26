import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Repository } from 'typeorm';
import { FilesUploadRepository } from './files-upload.repository';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly filesUploadRepository: FilesUploadRepository,
    @InjectRepository(Ejercicio)
    private readonly ejerciciosRepository: Repository<Ejercicio>,
  ) {}

  async uploadFiles(
    files: Express.Multer.File[],
    ejercicioId: string,
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ) {
    const ejercicio = await this.ejerciciosRepository.findOneBy({
      id: ejercicioId,
    });
    if (!ejercicio) {
      throw new NotFoundException('Ejercicio no encontrado');
    }

    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );

    if (uploadResults.length === 0) {
      throw new NotFoundException('No se pudieron cargar los archivos');
    }

    const fileUrls = uploadResults.map((result) => result.secure_url);

    await this.ejerciciosRepository.update(ejercicioId, {
      imgUrl: fileUrls,
    });

    const updatedEjercicio = await this.ejerciciosRepository.findOneBy({
      id: ejercicioId,
    });
    if (!updatedEjercicio) {
      throw new NotFoundException(
        'No se pudo actualizar la información del ejercicio',
      );
    }

    return updatedEjercicio;
  }
}
