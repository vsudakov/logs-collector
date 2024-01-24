import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { SearchContainersDto } from './dto/search-containers.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('start')
  async start(@Body() searchDto: SearchContainersDto) {
    const foundContainers =
      await this.logsService.searchExternalContainers(searchDto);

    if (!foundContainers.length) {
      throw new NotFoundException(
        `No containers were found by provided criteria.`,
      );
    }

    await this.logsService.start(foundContainers);

    return foundContainers;
  }

  @Post('pause')
  async pause(@Body() searchDto: SearchContainersDto) {
    const foundContainers =
      await this.logsService.searchSavedContainers(searchDto);

    if (!foundContainers.length) {
      throw new NotFoundException(
        `No containers were found by provided criteria.`,
      );
    }

    await this.logsService.pause(foundContainers);

    return foundContainers;
  }

  @Delete()
  async remove(@Body() searchDto: SearchContainersDto) {
    const foundContainers =
      await this.logsService.searchSavedContainers(searchDto);

    if (!foundContainers.length) {
      throw new NotFoundException(
        `No containers were found by provided criteria.`,
      );
    }

    await this.logsService.remove(foundContainers);

    return foundContainers;
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Post('tail')
  async tail(@Body() searchDto: SearchContainersDto) {
    const foundContainers =
      await this.logsService.searchSavedContainers(searchDto);

    if (foundContainers.length === 0) {
      throw new NotFoundException(
        `No containers were found by provided criteria.`,
      );
    }

    if (foundContainers.length > 1) {
      throw new HttpException(
        `More than one containers were found by provided criteria.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.logsService.tail(foundContainers[0]);
  }
}
