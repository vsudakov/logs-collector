import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ContainersEngineModule } from './containers-engine/containers-engine.module';
import { CollectorsModule } from './collectors/collectors.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/logs-collector`,
    ),
    ContainersEngineModule,
    CollectorsModule,
    StorageModule,
  ],
})
export class AppModule {}
