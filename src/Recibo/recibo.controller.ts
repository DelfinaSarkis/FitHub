import { Controller, Get } from '@nestjs/common';
import { ReciboService } from './recibo.service';

@Controller('recibo')
export class ReciboController {
  constructor(private readonly reciboService: ReciboService) {}

  @Get()
  async getAllRecibos() {
    return await this.reciboService.getAllRecibos();
  }
}
