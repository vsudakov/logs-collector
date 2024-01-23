import { ConfigService } from '@nestjs/config';
import * as Docker from 'dockerode';
import { Module } from '@nestjs/common';

export const DOCKER_SYMBOL = Symbol('DOCKER');

const docker = {
  provide: DOCKER_SYMBOL,
  useFactory: (configService: ConfigService) => {
    const protocol = configService.get<string>('DOCKER_API_PROTOCOL');
    const host = configService.get<string>('DOCKER_API_HOST');
    const port = configService.get<string>('DOCKER_API_PORT');

    const socketPath = configService.get<string>('DOCKER_API_SOCKET_PATH');

    return protocol && host && port
      ? new Docker({
          protocol: protocol as any,
          host,
          port,
        })
      : new Docker({ socketPath });
  },
  inject: [ConfigService],
};

@Module({
  providers: [docker],
  exports: [docker],
})
export class DockerModule {}
