import { Controller, Get, Param, Res } from '@nestjs/common';
import { Public } from '../decorator';

@Controller('avatar')
export class AvatarController {
  @Public()
  @Get(':name')
  async serveAvatar(
    @Param('name') name: string,
    @Res() res: any,
  ): Promise<any> {
    res.sendFile(name, { root: 'avatar' });
  }
}
