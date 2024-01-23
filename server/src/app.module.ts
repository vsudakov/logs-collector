import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContainersEngineModule } from './containers-engine/containers-engine.module';
import { LogsModule } from './logs/logs.module';
import { StorageModule } from './storage/storage.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/logs-collector`,
    ),

    ContainersEngineModule,
    LogsModule,
    StorageModule,
  ],
})
export class AppModule {}
