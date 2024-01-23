import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Docker from 'dockerode';
import { ConnectorService } from './connector.service';

import { Container } from '../../logs/entities/container.entity';
import { SearchContainersDto } from '../../logs/dto/search-containers.dto';

@Injectable()
export class DockerConnectorService extends ConnectorService {
  private readonly logger = new Logger(DockerConnectorService.name);

  constructor(private configService: ConfigService) {
    super();
  }

  private readonly protocol = this.configService.get<string>(
    'DOCKER_API_PROTOCOL',
  );
  private readonly host = this.configService.get<string>('DOCKER_API_HOST');
  private readonly port = this.configService.get<string>('DOCKER_API_PORT');

  private readonly socketPath = this.configService.get<string>(
    'DOCKER_API_SOCKET_PATH',
  );

  private docker =
    this.protocol && this.host && this.port
      ? new Docker({
          protocol: this.protocol as any,
          host: this.host,
          port: this.port,
        })
      : new Docker({ socketPath: this.socketPath });

  async getAllContainers() {
    return (await this.docker.listContainers({ all: true })).map((c) =>
      this.mapDockerContainer(c),
    );
  }

  async searchContainers(searchCriteria: SearchContainersDto) {
    const foundContainers = await this.docker.listContainers({
      all: true,
      filters: JSON.stringify(searchCriteria),
    });

    return foundContainers.map((c) => this.mapDockerContainer(c));
  }

  private mapDockerContainer(dockerContainer: Docker.ContainerInfo): Container {
    return {
      containerId: dockerContainer.Id,
      names: dockerContainer.Names,
      image: dockerContainer.Image,
    };
  }

  async getLogsStream(
    containerId: string,
    targetStream: NodeJS.WritableStream,
    lastTimestamp?: string,
  ) {
    const container = this.docker.getContainer(containerId);

    const timestamp = !!lastTimestamp && new Date(lastTimestamp).getTime();
    const timeStampInSeconds = timestamp && Math.floor(timestamp / 1000);

    const logsStream = await container.logs({
      timestamps: true,
      follow: true,
      stdout: true,
      stderr: true,
      ...(timeStampInSeconds && { since: timeStampInSeconds }),
    });

    container.modem.demuxStream(logsStream, targetStream, targetStream);

    return logsStream;
  }
}
