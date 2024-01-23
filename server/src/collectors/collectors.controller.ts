import {
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { CollectorsService } from './collectors.service';

@Controller('collectors')
export class CollectorsController {
  constructor(private readonly collectorsService: CollectorsService) {}

  @Post('start')
  @HttpCode(HttpStatus.OK)
  async start(@Query('id') id?: string, @Query('name') name?: string) {
    await this.collectorsService.start(id);
  }

  @Post('stop')
  @HttpCode(HttpStatus.OK)
  async stop(@Param('id') id?: string, @Query('name') name?: string) {
    // return this.collectorsService.create(createCollectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectorsService.remove(+id);
  }

  @Get()
  findAll() {
    return this.collectorsService.findAll();
  }

  @Get('logs/:id')
  getLogs(@Param('id') id: string) {
    return this.collectorsService.findAll();
  }
}
