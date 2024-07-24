import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config/typeORMconig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinaModule } from './Rutina/Rutina.module';
import { usersModule } from './User/User.module';
import { AuthModule } from './Auth/Auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EjercicoModule } from './Ejercicios/Ejercicios.module';
import { PlanModule } from './PlanDeEntranmiento/Plan.module';
import { FilesUploadModule } from './files-upload/files-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('typeorm');
        return config;
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    RutinaModule, usersModule,AuthModule, EjercicoModule, PlanModule
    RutinaModule,
    usersModule,
    AuthModule,
    FilesUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
