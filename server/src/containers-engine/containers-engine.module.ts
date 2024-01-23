import { Module } from '@nestjs/common';
import { ContainersEngineService } from './containers-engine.service';
import { ContainersEngineController } from './containers-engine.controller';
import { ConnectorModule } from './connector/connector.module';

@Module({
  imports: [ConnectorModule],
  controllers: [ContainersEngineController],
  providers: [ContainersEngineService],
})
export class ContainersEngineModule {}
