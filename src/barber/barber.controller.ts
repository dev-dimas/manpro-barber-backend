import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BarberService } from './barber.service';
import { CreateBarberDto, UpdateBarberDto } from './dto';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Get()
  getAllBarber() {
    return this.barberService.getAllBarber();
  }

  @Post()
  createBarber(@Body() createBarberDto: CreateBarberDto) {
    return this.barberService.createBarber(createBarberDto);
  }

  @Patch(':barber')
  updateBarber(
    @Param('barber') id: string,
    @Body() updateBarberDto: UpdateBarberDto,
  ) {
    return this.barberService.updateBarber(+id, updateBarberDto);
  }

  @Get(':barber')
  getBarber(@Param('barber') id: string) {
    return this.barberService.getBarber(+id);
  }

  @Delete(':barber')
  deleteBarber(@Param('barber') id: string) {
    return this.barberService.deleteBarber(+id);
  }
}
