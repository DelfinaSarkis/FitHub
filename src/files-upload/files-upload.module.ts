import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller';
import { FilesUploadService } from './files-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { FilesUploadRepository } from './files-upload.repository';
import { CloudinaryConfig } from 'config/cloudinary';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ejercicio]),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: [FilesUploadController],
  providers: [FilesUploadService, FilesUploadRepository, CloudinaryConfig],
})
export class FilesUploadModule {}
