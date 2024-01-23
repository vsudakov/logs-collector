import { Controller, Get } from '@nestjs/common';
import { ContainersEngineService } from './containers-engine.service';

@Controller()
export class ContainersEngineController {
  constructor(private readonly containersService: ContainersEngineService) {}

  @Get('available-containers')
  findAll() {
    return this.containersService.findAll();
  }
}
