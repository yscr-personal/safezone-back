import { Test, TestingModule } from '@nestjs/testing';
import { SentryInterceptor } from '../sentry.interceptor';
import { SentryService } from '../sentry.service';

describe('SentryInterceptor', () => {
  let service: SentryInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentryInterceptor, SentryService],
    }).compile();

    service = await module.resolve<SentryInterceptor>(SentryInterceptor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
