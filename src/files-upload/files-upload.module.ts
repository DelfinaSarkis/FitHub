import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller';
import { FilesUploadService } from './files-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { FilesUploadRepository } from './files-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio])],
  controllers: [FilesUploadController],
  providers: [FilesUploadService, FilesUploadRepository],
})
export class FilesUploadModule {}
