import { Module } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { DockerConnectorService } from './connector/docker-connector.service';
import { ConnectorService } from './connector/connector.service';

@Module({
  controllers: [ContainersController],
  providers: [
    ContainersService,
    { provide: ConnectorService, useClass: DockerConnectorService },
  ],
})
export class ContainersModule {}
