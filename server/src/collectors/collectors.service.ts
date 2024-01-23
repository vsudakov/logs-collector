import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConnectorService } from '../containers-engine/connector/connector.service';
import { PassThrough } from 'stream';
import { Container } from './entities/container.entity';
import { State } from './entities/state';
import { ContainerStorageService } from '../storage/container.storage.service';
import { LogEntryStorageService } from '../storage/log-entry.storage.service';
import { CollectorStorageService } from '../storage/collector.storage.service';

@Injectable()
export class CollectorsService {
  private readonly logger = new Logger(CollectorsService.name);

  constructor(
    private readonly connectorService: ConnectorService,
    private readonly logEntryStorageService: LogEntryStorageService,
    private readonly containerStorageService: ContainerStorageService,
    private readonly collectorStorageService: CollectorStorageService,
  ) {}

  async start(id?: string, name?: string) {
    const containers = await this.connectorService.searchContainers(id, name);

    if (!containers || !containers.length) {
      throw new HttpException(
        `No containers were found by provided criterias.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    containers.forEach((c) => this.collect(c));
  }

  async collect(container: Container) {
    const savedContainer =
      await this.containerStorageService.createIfNotExists(container);
    const savedCollector = await this.collectorStorageService.createIfNotExists(
      {
        state: State.FOLLOWING,
        container: savedContainer!,
      },
    );

    const storageStream = new PassThrough();

    storageStream.on('data', (chunk) => {
      this.logEntryStorageService.save({
        text: chunk.toString('utf8'),
        collector: savedCollector!,
      });
    });

    const logsStream = await this.connectorService.getLogsStream(
      container.containerId,
      storageStream,
    );

    logsStream.on('error', (error) => {
      this.logger.error({ message: `Error occurred while reading`, error });
    });

    logsStream.on('end', () => {
      this.logger.log({
        message: `Logs stream for container '${container.containerId}' has been finished.`,
      });
    });
  }

  findAll() {
    return `This action returns all collectors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collector`;
  }

  remove(id: number) {
    return `This action removes a #${id} collector`;
  }
}
