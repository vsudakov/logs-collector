import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Docker from 'dockerode';
import { ConnectorService } from './connector.service';
import { Container } from '../../collectors/entities/container.entity';

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

  async searchContainers(id?: string, name?: string) {
    let foundContainers: Docker.ContainerInfo[];

    if (id) {
      foundContainers = await this.docker.listContainers({
        all: true,
        filters: JSON.stringify({ id: [id] }),
      });
    } else if (name) {
      foundContainers = await this.docker.listContainers({
        all: true,
        filters: JSON.stringify({ name: [name] }),
      });
    } else {
      foundContainers = [];
    }

    return foundContainers.map((c) => this.mapDockerContainer(c));
  }

  private mapDockerContainer(dockerContainer: Docker.ContainerInfo): Container {
    return {
      containerId: dockerContainer.Id,
      names: dockerContainer.Names,
      image: dockerContainer.Image,
      state: dockerContainer.State,
    };
  }

  async getLogsStream(
    containerId: string,
    targetStream: NodeJS.WritableStream,
  ) {
    const container = this.docker.getContainer(containerId);

    const logsStream = await container.logs({
      timestamps: true,
      follow: true,
      stdout: true,
      stderr: true,
    });

    container.modem.demuxStream(logsStream, targetStream, targetStream);

    return logsStream;
  }
}
