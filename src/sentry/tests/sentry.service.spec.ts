import { Test, TestingModule } from '@nestjs/testing';
import { SentryService } from '../sentry.service';

describe('SentryService', () => {
  let service: SentryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentryService],
    }).compile();

    service = await module.resolve<SentryService>(SentryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
