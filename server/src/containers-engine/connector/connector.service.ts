import { Injectable } from '@nestjs/common';

import { Container } from '../../logs/entities/container.entity';
import { SearchContainersDto } from '../../logs/dto/search-containers.dto';

@Injectable()
export abstract class ConnectorService {
  abstract getAllContainers(): Promise<Container[]>;

  abstract searchContainers(
    searchDto: SearchContainersDto,
  ): Promise<Container[]>;

  abstract getLogsStream(
    containerId: string,
    targetStream: NodeJS.WritableStream,
    lastTimestamp?: string,
  ): Promise<NodeJS.ReadableStream>;
}
