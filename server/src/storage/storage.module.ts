import { Module } from '@nestjs/common';
import { LogEntryMongoStorageService } from './mongo/log-entry.mongo-storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectorSchema } from './mongo/schemas/collector.schema';
import { ContainerSchema } from './mongo/schemas/container.schema';
import { LogEntrySchema } from './mongo/schemas/log-entry.schema';
import { ContainerMongoStorageService } from './mongo/container.mongo-storage.service';
import { CollectorMongoStorageService } from './mongo/collector.mongo-storage.service';
import { CollectorStorageService } from './collector.storage.service';
import { ContainerStorageService } from './container.storage.service';
import { LogEntryStorageService } from './log-entry.storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Container', schema: ContainerSchema }]),
    MongooseModule.forFeature([{ name: 'Collector', schema: CollectorSchema }]),
    MongooseModule.forFeature([{ name: 'LogEntry', schema: LogEntrySchema }]),
  ],
  providers: [
    {
      provide: CollectorStorageService,
      useClass: CollectorMongoStorageService,
    },
    {
      provide: ContainerStorageService,
      useClass: ContainerMongoStorageService,
    },
    {
      provide: LogEntryStorageService,
      useClass: LogEntryMongoStorageService,
    },
  ],
  exports: [
    CollectorStorageService,
    ContainerStorageService,
    LogEntryStorageService,
  ],
})
export class StorageModule {}
