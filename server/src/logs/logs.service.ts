import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConnectorService } from '../containers-engine/connector/connector.service';
import { ContainerStorageService } from '../storage/container.storage.service';
import { LogEntryStorageService } from '../storage/log-entry.storage.service';
import { State } from './entities/job.entity';
import { Container } from './entities/container.entity';
import { SearchContainersDto } from './dto/search-containers.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LogsService implements OnModuleInit {
  private readonly logger;

  constructor(
    loggerService: LoggerService,
    private readonly connectorService: ConnectorService,
    private readonly containerStorageService: ContainerStorageService,
    private readonly logEntryStorageService: LogEntryStorageService,
  ) {
    this.logger = loggerService.getLogger(LogsService.name);
  }

  searchExternalContainers(searchCriteria: SearchContainersDto) {
    return this.connectorService.searchContainers(searchCriteria);
  }

  searchSavedContainers(searchCriteria: SearchContainersDto) {
    return this.containerStorageService.search(searchCriteria);
  }

  async start(containers: Container[]) {
    containers.forEach((c) =>
      this.startOne(c).catch((error) => {
        this.logger.error({ error });
      }),
    );
  }

  async startOne(newContainer: Container) {
    try {
      const container = await this.containerStorageService.upsert({
        ...newContainer,
        job: { state: State.FOLLOWING },
      });

      const lastLogEntry =
        await this.logEntryStorageService.findLast(container);

      const logsGenerator = this.connectorService.getLogsGenerator(
        container.containerId,
        lastLogEntry?.timestamp,
      );

      for await (const { timestamp, text } of logsGenerator) {
        await this.logEntryStorageService.save({
          timestamp,
          text,
          container,
        });
      }

      await this.containerStorageService.updateState(
        container,
        State.COMPLETED,
      );

      this.logger.log({
        message: `All logs were successfully written for container '${newContainer.containerId}'.`,
      });
    } catch (error) {
      this.logger.error({
        message: `Error occurred during fetching the logs for container '${newContainer.containerId}'`,
        error,
      });

      this.emergencyStop(newContainer);
    }
  }

  async pause(containers: Container[]) {
    containers.forEach((c) =>
      this.pauseOne(c).catch((error) => {
        this.logger.error({ error });
      }),
    );
  }

  async pauseOne(container: Container) {
    try {
      this.connectorService.stop(container.containerId);
      await this.containerStorageService.updateState(container, State.PAUSED);
    } catch (error) {
      this.logger.error({
        message: `Error occurred during pausing the logs for container '${container.containerId}'`,
        error,
      });

      this.emergencyStop(container);
    }
  }

  async remove(containers: Container[]) {
    containers.forEach((c) =>
      this.removeOne(c).catch((error) => {
        this.logger.error({ error });
      }),
    );
  }

  async removeOne(container: Container) {
    try {
      this.connectorService.stop(container.containerId);
      await this.logEntryStorageService.removeAll(container);
      await this.containerStorageService.remove(container);
    } catch (error) {
      this.logger.error({
        message: `Error occurred during removing the logs for container '${container.containerId}'`,
        error,
      });

      this.emergencyStop(container);
    }
  }

  async findAll() {
    return this.containerStorageService.getAll();
  }

  async tail(container: Container) {
    await this.logEntryStorageService.getByContainer(container.containerId);
  }

  emergencyStop(container: Container) {
    this.connectorService.stop(container.containerId);

    this.containerStorageService
      .updateState(container, State.ERROR)
      .catch((error) => {
        this.logger.error({
          message: `Error occurred during updating the status for container '${container.containerId}'`,
          error,
        });
      });
  }

  async onModuleInit() {
    const containersToStart = await this.containerStorageService.findByState(
      State.FOLLOWING,
    );

    this.start(containersToStart);
  }
}
