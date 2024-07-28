import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seeder')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async addSeeders() {
    return await this.seederService.addSeeders();
  }
}
