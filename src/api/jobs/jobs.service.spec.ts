import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let jobsService: JobsService;
  let prisma: DeepMockProxy<PrismaClient>;
  const dummyCompany = {
    company_id: 1,
    name: '원티드랩',
    nation: '한국',
    region: '서울',
  };
  const dummyPayload = {
    position: '백엔드 개발자',
    compensation: 1000000,
    content: '백엔드 개발자를 모집합니다.',
    tech: 'NestJS',
  };
  const dummyAnnouncement = {
    job_id: 1,
    ...dummyPayload,
    company_id: dummyCompany.company_id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    jobsService = module.get<JobsService>(JobsService);
    prisma = module.get(PrismaService);
  });

  it('createAnnouncement => return announcement', () => {
    const result = Object.assign(
      {
        company_id: dummyCompany.company_id,
      },
      dummyPayload,
    );

    prisma.company.findFirst.mockResolvedValue(dummyCompany);
    prisma.job.create.mockResolvedValue(result as any);
    prisma.$transaction.mockResolvedValue([result]);
    expect(
      jobsService.createAnnouncement(dummyCompany.company_id, result),
    ).resolves.toStrictEqual([result]);
  });

  it('getAllAnnouncement => return all announcement', () => {
    const result = {
      ...dummyAnnouncement,
      Company: dummyCompany,
    };

    prisma.job.findMany.mockResolvedValue([result]);
    expect(jobsService.getAllAnnouncement()).resolves.toStrictEqual([result]);
  });

  it('searchAnnouncementByKeyword => if the keyword type is number, return announcement', () => {
    const result = {
      job_id: 1,
      Company: dummyCompany,
      position: '주니어 프론트엔드 개발자',
      compensation: 1000000,
      tech: 'React',
    };

    prisma.job.findMany.mockResolvedValue([result as any]);
    expect(jobsService.searchAnnouncementByKeyword(1500000)).resolves.toEqual([
      result,
    ]);
  });

  it('searchAnnouncementByKeyword => if the keyword type is string, return announcement', () => {
    const result = {
      job_id: 1,
      Company: dummyCompany,
      position: '주니어 프론트엔드 개발자',
      compensation: 1000000,
      tech: 'React',
    };

    prisma.job.findMany.mockResolvedValue([result as any]);
    expect(
      jobsService.searchAnnouncementByKeyword('프론트엔드'),
    ).resolves.toEqual([result]);
  });
});
