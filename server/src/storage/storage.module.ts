import { Module } from '@nestjs/common';
import { LogEntryMongoStorageService } from './mongo/log-entry.mongo-storage.service';
import { ContainerMongoStorageService } from './mongo/container.mongo-storage.service';
import { ContainerStorageService } from './container.storage.service';
import { LogEntryStorageService } from './log-entry.storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContainerSchema } from './mongo/schemas/container.schema';
import { LogEntrySchema } from './mongo/schemas/log-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Container', schema: ContainerSchema }]),
    MongooseModule.forFeature([{ name: 'LogEntry', schema: LogEntrySchema }]),
  ],
  providers: [
    {
      provide: ContainerStorageService,
      useClass: ContainerMongoStorageService,
    },
    {
      provide: LogEntryStorageService,
      useClass: LogEntryMongoStorageService,
    },
  ],
  exports: [ContainerStorageService, LogEntryStorageService],
})
export class StorageModule {}
