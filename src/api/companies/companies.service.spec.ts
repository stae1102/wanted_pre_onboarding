import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../../prisma/prisma.service';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let companiesService: CompaniesService;
  let prisma: DeepMockProxy<PrismaClient>;
  const reusableData = {
    company_id: 1,
    name: '원티드랩',
    nation: '한국',
    region: '서울',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    companiesService = module.get<CompaniesService>(CompaniesService);
    prisma = module.get(PrismaService);
  });

  it('createCompany => return company', () => {
    const result = {
      company_id: 1,
      name: '네이버',
      nation: '한국',
      region: '판교',
    };
    prisma.company.create.mockResolvedValue(result);
    prisma.$transaction.mockResolvedValue([result]);
    expect(
      companiesService.createCompany(
        reusableData.name,
        reusableData.nation,
        reusableData.region,
      ),
    ).resolves.toStrictEqual([result]);
  });

  it('getAllCompanies => return companies', () => {
    const testCompanies = [
      reusableData,
      {
        company_id: 2,
        name: '네이버',
        nation: '한국',
        region: '판교',
      },
    ];
    prisma.company.findMany.mockResolvedValue(testCompanies);
    expect(companiesService.getAllCompanies()).resolves.toStrictEqual(
      testCompanies,
    );
  });

  it('getCompanyById => return specific company', () => {
    prisma.company.findUnique.mockResolvedValue(reusableData);
    expect(
      companiesService.getCompanyById(reusableData.company_id),
    ).resolves.toStrictEqual(reusableData);
  });
});
