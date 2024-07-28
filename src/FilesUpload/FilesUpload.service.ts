// import { Injectable, NotFoundException } from '@nestjs/common';
// import { FilesUploadRepository } from './FilesUpload.repository';

// @Injectable()
// export class FilesUploadService {
//   constructor(private readonly filesUploadRepository: FilesUploadRepository) {}

//   // @UseInterceptors(FilesUploadInterceptor)
//   async uploadFiles(
//     files: Express.Multer.File[],
//     resourceType: 'auto' | 'image' | 'video' = 'auto',
//   ): Promise<string[]> {
//     const uploadResults = await this.filesUploadRepository.uploadFiles(
//       files,
//       resourceType,
//     );
//     if (uploadResults.length === 0) {
//       throw new NotFoundException('No se pudieron cargar los archivos');
//     }
//     return uploadResults.map((result) => result.secure_url);
//   }
// }
