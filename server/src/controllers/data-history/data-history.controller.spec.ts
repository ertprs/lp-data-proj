import { Test, TestingModule } from '@nestjs/testing';
import { DataHistoryController } from './data-history.controller';

describe('DataHistory Controller', () => {
  let controller: DataHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataHistoryController],
    }).compile();

    controller = module.get<DataHistoryController>(DataHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
