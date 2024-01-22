import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContainersModule } from './containers/containers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContainersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
