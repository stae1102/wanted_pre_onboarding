import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompany(name: string, nation: string, region: string) {
    return await this.prisma.$transaction([
      this.prisma.company.create({
        data: {
          name,
          nation,
          region,
        },
      }),
    ]);
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: number) {
    return await this.prisma.company.findUnique({
      where: {
        company_id: id,
      },
    });
  }
}
