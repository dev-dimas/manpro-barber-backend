import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
  ParseUUIDPipe,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public, Roles } from '../decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Role } from '../enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get(':user')
  findOne(
    @Param(
      'user',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.userService.findOne(id);
  }

  @Roles(Role.USER)
  @Put(':user')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatar',
        filename: (req, file, cb) => {
          cb(null, +Date.now() + file.originalname);
        },
      }),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.includes('png') ||
          file.mimetype.includes('jpg') ||
          file.mimetype.includes('jpeg')
        ) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('expected type is .(png|jpeg|jpg)'),
            false,
          );
        }
      },
    }),
  )
  update(
    @UploadedFile()
    avatar: Express.Multer.File,
    @Param(
      'user',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, avatar, updateUserDto);
  }

  @Roles(Role.USER)
  @Delete(':user')
  deleteEmployee(
    @Param(
      'user',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.userService.deleteUser(id);
  }
}
