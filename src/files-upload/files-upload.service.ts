import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Repository } from 'typeorm';
import { FilesUploadRepository } from './files-upload.repository';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Users } from 'src/User/User.entity';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly filesUploadRepository: FilesUploadRepository,
    @InjectRepository(Ejercicio)
    private readonly ejerciciosRepository: Repository<Ejercicio>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async uploadFilesEjercicio(
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

  async uploadFilesRutina(
    files: Express.Multer.File[],
    rutinaId: string,
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ) {
    const rutina = await this.rutinaRepository.findOneBy({ id: rutinaId });
    if (!rutina) {
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
    await this.rutinaRepository.update(rutinaId, {
      imgUrl: fileUrls,
    });
    const updatedRutina = await this.rutinaRepository.findOneBy({
      id: rutinaId,
    });
    if (!updatedRutina) {
      throw new NotFoundException(
        'No se pudo actualizar la información del ejercicio',
      );
    }
    return updatedRutina;
  }

  async uploadFiles(
    files: Express.Multer.File[],
    rutinaId: string,
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ) {
    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );
    if (uploadResults.length === 0) {
      throw new NotFoundException('No se pudieron cargar los archivos');
    }
    const fileUrls = uploadResults.map((result) => result.secure_url);
    return fileUrls;
  }

  async uploadPdfFiles(files: Express.Multer.File[]) {
    files.forEach((file) => {
      if (file.mimetype !== 'application/pdf') {
        throw new BadRequestException(
          'Solo se permiten archivos en formato PDF',
        );
      }
    });

    const uploadResults =
      await this.filesUploadRepository.uploadPdfFiles(files);

    if (uploadResults.length === 0) {
      throw new NotFoundException('No se pudieron cargar los archivos');
    }

    const fileUrls = uploadResults.map((result) => result.secure_url);
    return fileUrls;
  }

  async uploadImageProfile(
    files: Express.Multer.File[],
    userId: string,
    resourceType: 'auto' | 'image' = 'auto',
  ) {
    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );
    if (uploadResults.length === 0) {
      throw new NotFoundException('No se pudieron cargar los archivos');
    }
    const imgUrl = uploadResults[0].secure_url;

    const updateUser = await this.usersRepository.update(userId, { imgUrl });

    return await this.usersRepository.findOne({ where: { id: userId } });
  }
}
