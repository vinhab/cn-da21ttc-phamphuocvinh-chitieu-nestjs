import { Test, TestingModule } from '@nestjs/testing';
import { MonthlySummaryService } from './monthly-summary.service';

describe('MonthlySummaryService', () => {
  let service: MonthlySummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlySummaryService],
    }).compile();

    service = module.get<MonthlySummaryService>(MonthlySummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
