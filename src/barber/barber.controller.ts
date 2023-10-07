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
import { Public, Roles } from '../decorator';
import { Role } from '../enum';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Public()
  @Get()
  getAllBarber() {
    return this.barberService.getAllBarber();
  }

  @Public()
  @Post()
  createBarber(@Body() createBarberDto: CreateBarberDto) {
    return this.barberService.createBarber(createBarberDto);
  }

  @Roles(Role.OWNER, Role.ADMIN)
  @Patch(':barber')
  updateBarber(
    @Param('barber') id: string,
    @Body() updateBarberDto: UpdateBarberDto,
  ) {
    return this.barberService.updateBarber(id, updateBarberDto);
  }

  @Public()
  @Get(':barber')
  getBarber(@Param('barber') id: string) {
    return this.barberService.getBarber(id);
  }

  @Roles(Role.OWNER)
  @Delete(':barber')
  deleteBarber(@Param('barber') id: string) {
    return this.barberService.deleteBarber(id);
  }
}
