import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import * as Docker from 'dockerode';
import { ConnectorService } from './connector.service';

import { Container } from '../../logs/entities/container.entity';
import { SearchContainersDto } from '../../logs/dto/search-containers.dto';
import * as readline from 'readline';
import { DOCKER_SYMBOL } from './docker.module';

@Injectable()
export class DockerConnectorService
  extends ConnectorService
  implements OnModuleDestroy
{
  private readonly logger = new Logger(DockerConnectorService.name);

  private abortControllers = new Map<string, AbortController>();

  constructor(@Inject(DOCKER_SYMBOL) private readonly docker: Docker) {
    super();
  }

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

  async *getLogs(containerId: string, sinceTimestamp?: string) {
    const container = this.docker.getContainer(containerId);

    const timestamp = !!sinceTimestamp && new Date(sinceTimestamp).getTime();
    const timeStampInSeconds = timestamp && Math.floor(timestamp / 1000);

    const controller = new AbortController();
    this.abortControllers.set(containerId, controller);

    const logsStream = await container.logs({
      abortSignal: controller.signal,
      timestamps: true,
      follow: true,
      stdout: true,
      stderr: true,
      ...(timeStampInSeconds && { since: timeStampInSeconds }),
    });

    const readliner = readline.createInterface(logsStream);

    for await (const line of readliner) {
      const regex =
        /(?<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\s(?<text>.*)/;

      const match = regex.exec(line);

      if (match) {
        const { timestamp, text } = match.groups!;
        yield { timestamp, text };
      }
    }
  }

  stop(containerId: string) {
    const controller = this.abortControllers.get(containerId);
    controller?.abort();
    this.abortControllers.delete(containerId);
  }

  onModuleDestroy() {
    for (const controller of this.abortControllers.values()) {
      controller.abort();
    }
  }
}
