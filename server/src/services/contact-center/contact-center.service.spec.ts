import { Test, TestingModule } from '@nestjs/testing';
import { ContactCenterService } from './contact-center.service';

describe('ContactCenterService', () => {
  let service: ContactCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactCenterService],
    }).compile();

    service = module.get<ContactCenterService>(ContactCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
