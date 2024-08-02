import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recibo } from './recibo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReciboDto } from './createRecibo.dto';

@Injectable()
export class ReciboRepository {
  constructor(
    @InjectRepository(Recibo)
    private readonly reciboRepository: Repository<Recibo>,
  ) {}

  async createRecibo(recibo: CreateReciboDto) {
    return await this.reciboRepository.save(recibo);
  }

  async getAllRecibos(){
    return await this.reciboRepository.find();
  }
}
