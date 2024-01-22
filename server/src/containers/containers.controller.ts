import { Controller, Get } from '@nestjs/common';
import { ContainersService } from './containers.service';

@Controller('containers')
export class ContainersController {
  constructor(private readonly containersService: ContainersService) {}

  @Get()
  findAll() {
    return this.containersService.findAll();
  }
}
