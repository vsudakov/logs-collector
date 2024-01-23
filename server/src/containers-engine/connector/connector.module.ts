import { Module } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { DockerConnectorService } from './docker-connector.service';
import { DockerModule } from './docker.module';

@Module({
  imports: [DockerModule],
  providers: [{ provide: ConnectorService, useClass: DockerConnectorService }],
  exports: [ConnectorService],
})
export class ConnectorModule {}
