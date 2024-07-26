import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class FilesUploadRepository {
  async uploadFiles(
    files: Express.Multer.File[],
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ): Promise<UploadApiResponse[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          { resource_type: resourceType },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    });

    return Promise.all(uploadPromises);
  }
}
