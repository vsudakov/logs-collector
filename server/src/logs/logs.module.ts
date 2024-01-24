import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { ContainersEngineModule } from '../containers-engine/containers-engine.module';
import { StorageModule } from '../storage/storage.module';
import { ConnectorModule } from '../containers-engine/connector/connector.module';

@Module({
  imports: [ConnectorModule, ContainersEngineModule, StorageModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
