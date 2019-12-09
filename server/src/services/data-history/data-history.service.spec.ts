import { Test, TestingModule } from '@nestjs/testing';
import { DataHistoryService } from './data-history.service';

describe('DataHistoryService', () => {
  let service: DataHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataHistoryService],
    }).compile();

    service = module.get<DataHistoryService>(DataHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
