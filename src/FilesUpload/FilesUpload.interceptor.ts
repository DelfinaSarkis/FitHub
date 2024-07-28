// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   UseInterceptors,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import {
//   FileTypeValidator,
//   MaxFileSizeValidator,
//   ParseFilePipe,
// } from '@nestjs/common';

// @Injectable()
// @UseInterceptors(FilesInterceptor('files'))
// export class FilesUploadInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const files = request.files;

//     if (!files || files.length === 0) {
//       throw new Error('File is required');
//     }

//     files.forEach((file: Express.Multer.File) => {
//       const fileSizeValidator = new MaxFileSizeValidator({ maxSize: 1500000 });
//       const fileTypeValidator = new FileTypeValidator({
//         fileType: /(.jpg|.png|.jpeg|.webp|.mp4|.avi|.mov)/,
//       });

//       const fileSizePipe = new ParseFilePipe({
//         validators: [fileSizeValidator, fileTypeValidator],
//       });

//       fileSizePipe.transform(file);
//     });

//     return next.handle();
//   }
// }
