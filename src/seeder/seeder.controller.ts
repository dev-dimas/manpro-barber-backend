import { Controller, Post } from '@nestjs/common';
import { Public } from '../decorator';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Public()
  @Post()
  create() {
    return this.seederService.createSeeder();
  }
}
