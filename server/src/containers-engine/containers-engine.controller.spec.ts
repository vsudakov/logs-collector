import { Test, TestingModule } from '@nestjs/testing';
import { ContainersEngineController } from './containers-engine.controller';
import { ContainersEngineService } from './containers-engine.service';

describe('ContainersEngineController', () => {
  let controller: ContainersEngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContainersEngineController],
      providers: [ContainersEngineService],
    }).compile();

    controller = module.get<ContainersEngineController>(
      ContainersEngineController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
