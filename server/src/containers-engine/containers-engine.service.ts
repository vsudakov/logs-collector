import { Injectable } from '@nestjs/common';
import { ConnectorService } from './connector/connector.service';

@Injectable()
export class ContainersEngineService {
  constructor(private readonly connectorService: ConnectorService) {}

  async findAll() {
    return await this.connectorService.getAllContainers();
  }
}
