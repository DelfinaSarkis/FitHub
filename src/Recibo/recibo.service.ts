import { Injectable } from '@nestjs/common';
import { CreateReciboDto } from './createRecibo.dto';
import { ReciboRepository } from './recibo.repository';

@Injectable()
export class ReciboService {
  constructor(private readonly reciboRepository: ReciboRepository) {}

  async createRecibo(recibo: CreateReciboDto) {
    return await this.reciboRepository.createRecibo(recibo);
  }

  async getAllRecibos() {
    return await this.reciboRepository.getAllRecibos();
  }
}
