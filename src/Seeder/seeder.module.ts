import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { AuthModule } from 'src/Auth/Auth.module';
import { usersModule } from 'src/User/User.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { CategoryModule } from 'src/Category/Category.module';

@Module({
  imports: [
    CategoryModule,
    AuthModule,
    usersModule,
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
