import { Injectable } from '@nestjs/common';

import { Container } from '../../logs/entities/container.entity';
import { SearchContainersDto } from '../../logs/dto/search-containers.dto';

@Injectable()
export abstract class ConnectorService {
  abstract getAllContainers(): Promise<Container[]>;

  abstract searchContainers(
    searchDto: SearchContainersDto,
  ): Promise<Container[]>;

  abstract getLogsGenerator(
    containerId: string,
    sinceTimestamp?: string,
  ): AsyncGenerator<{ timestamp: string; text: string }>;

  abstract stop(containerId: string): void;
}
