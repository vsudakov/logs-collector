import { Injectable } from '@nestjs/common';
import { Container } from '../../collectors/entities/container.entity';

@Injectable()
export abstract class ConnectorService {
  abstract getAllContainers(): Promise<Container[]>;

  abstract searchContainers(id?: string, name?: string): Promise<Container[]>;

  abstract getLogsStream(
    containerId: string,
    targetStream: NodeJS.WritableStream,
  ): Promise<NodeJS.ReadableStream>;
}
