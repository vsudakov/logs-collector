import { Module } from '@nestjs/common';
import { CollectorsService } from './collectors.service';
import { CollectorsController } from './collectors.controller';
import { ContainersEngineModule } from '../containers-engine/containers-engine.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [ContainersEngineModule, StorageModule],
  controllers: [CollectorsController],
  providers: [CollectorsService],
})
export class CollectorsModule {}
