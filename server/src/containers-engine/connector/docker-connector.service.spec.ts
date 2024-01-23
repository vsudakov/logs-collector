import { Test, TestingModule } from '@nestjs/testing';
import { DockerConnectorService } from './docker-connector.service';

describe('DockerConnectorService', () => {
  let service: DockerConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerConnectorService],
    }).compile();

    service = module.get<DockerConnectorService>(DockerConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
