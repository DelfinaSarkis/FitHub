import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.Sevice';
import { AuthRepository } from './Auth.Repository';
import { UsersRepository } from 'src/User/User.repository';
<<<<<<< HEAD
import { PasswordService } from './Auth.randonPass';
=======
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/mailer.service';
>>>>>>> NotificacionesMail

@Module({
  imports: [TypeOrmModule.forFeature([Users]), MailerModule],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService, AuthRepository, UsersRepository, PasswordService],
=======
  providers: [AuthService, AuthRepository, UsersRepository, MailerService],
>>>>>>> NotificacionesMail
  exports: [AuthService],
})
export class AuthModule {}
