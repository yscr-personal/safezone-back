import { Test, TestingModule } from '@nestjs/testing';
import { PrismaHealthIndicator } from '../prisma.health';
import { PrismaService } from '../prisma.service';

describe('PrismaHealthIndicator', () => {
  let service: PrismaHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaHealthIndicator, PrismaService],
    }).compile();

    service = module.get<PrismaHealthIndicator>(PrismaHealthIndicator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
