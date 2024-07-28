import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { EjercicoModule } from 'src/Ejercicios/Ejercicios.module';
import { AuthModule } from 'src/Auth/Auth.module';

@Module({
  imports: [EjercicoModule, AuthModule],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
