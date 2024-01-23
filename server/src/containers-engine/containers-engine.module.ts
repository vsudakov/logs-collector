import { Module } from '@nestjs/common';
import { ContainersEngineService } from './containers-engine.service';
import { ContainersEngineController } from './containers-engine.controller';
import { DockerConnectorService } from './connector/docker-connector.service';
import { ConnectorService } from './connector/connector.service';

@Module({
  controllers: [ContainersEngineController],
  providers: [
    ContainersEngineService,
    { provide: ConnectorService, useClass: DockerConnectorService },
  ],
  exports: [ConnectorService],
})
export class ContainersEngineModule {}
