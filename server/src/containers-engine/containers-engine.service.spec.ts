import { Test, TestingModule } from '@nestjs/testing';
import { ContainersEngineService } from './containers-engine.service';

describe('ContainersEngineService', () => {
  let service: ContainersEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContainersEngineService],
    }).compile();

    service = module.get<ContainersEngineService>(ContainersEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
