// import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
// import * as multer from 'multer';
// import { FilesUploadService } from './FilesUpload.service';
// import { FilesUploadRepository } from './FilesUpload.repository';
// import { CloudinaryConfig } from 'config/cloudinary';
// import { FilesUploadInterceptor } from './FilesUpload.interceptor';

// @Module({
//   imports: [
//     MulterModule.register({
//       storage: multer.memoryStorage(),
//     }),
//   ],
//   providers: [
//     FilesUploadService,
//     FilesUploadRepository,
//     CloudinaryConfig,
//     FilesUploadInterceptor,
//   ],
//   exports: [FilesUploadService, FilesUploadInterceptor],
// })
// export class FilesUploadModule {}
