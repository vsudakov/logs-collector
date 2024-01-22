import { Injectable } from '@nestjs/common';
import { ContainerInfo } from 'dockerode';

@Injectable()
export abstract class ConnectorService {
  abstract getAll(): Promise<ContainerInfo[]>;
}
