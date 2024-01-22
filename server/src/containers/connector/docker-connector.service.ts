import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Docker from 'dockerode';
import { ConnectorService } from './connector.service';

@Injectable()
export class DockerConnectorService extends ConnectorService {
  constructor(private configService: ConfigService) {
    super();
  }

  private readonly socketPath = this.configService.get<string>(
    'DOCKER_API_SOCKET_PATH',
  );

  private readonly protocol = this.configService.get<string>(
    'DOCKER_API_PROTOCOL',
  );
  private readonly host = this.configService.get<string>('DOCKER_API_HOST');
  private readonly port = this.configService.get<string>('DOCKER_API_PORT');

  private docker = this.socketPath
    ? new Docker({ socketPath: this.socketPath })
    : new Docker({
        protocol: this.protocol as any,
        host: this.host,
        port: this.port,
      });

  async getAll() {
    return await this.docker.listContainers({ all: true });
  }
}
