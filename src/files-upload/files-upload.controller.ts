import { Controller } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';

@Controller('files-upload')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}
}
