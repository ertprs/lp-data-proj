import { Test, TestingModule } from '@nestjs/testing';
import { ContactCenterController } from './contact-center.controller';

describe('ContactCenter Controller', () => {
  let controller: ContactCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactCenterController],
    }).compile();

    controller = module.get<ContactCenterController>(ContactCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
