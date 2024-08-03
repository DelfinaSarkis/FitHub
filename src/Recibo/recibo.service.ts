import { Injectable } from '@nestjs/common';
import { CreateReciboDto } from './createRecibo.dto';
import { ReciboRepository } from './recibo.repository';
import { UUID } from 'crypto';

@Injectable()
export class ReciboService {
  constructor(private readonly reciboRepository: ReciboRepository) {}

  async createRecibo(recibo: CreateReciboDto) {
    return await this.reciboRepository.createRecibo(recibo);
  }

  async getAllRecibos() {
    return await this.reciboRepository.getAllRecibos();
  }

  async getReciboById(id: string) {
    return await this.reciboRepository.getReciboById(id);
  }
}
