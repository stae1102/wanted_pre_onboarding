import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnnouncement(payload: CreateAnnouncementDto) {
    const company = await this.findCompany(+payload.company_id);
    const result = await this.prisma.$transaction([
      this.prisma.job.create({
        data: {
          company_id: company.company_id,
          position: payload.position,
          compensation: +payload.compensation,
          content: payload.content,
          tech: payload.tech,
        },
        select: {
          company_id: true,
          position: true,
          compensation: true,
          content: true,
          tech: true,
        },
      }),
    ]);
    return result;
  }

  async getAllAnnouncement() {
    const announcements = await this.prisma.job.findMany({
      select: {
        job_id: true,
        Company: {
          select: {
            name: true,
            nation: true,
            region: true,
          },
        },
        position: true,
        compensation: true,
        tech: true,
      },
    });
    announcements.map((data) => {
      Object.assign(data, data.Company);
      delete data.Company;
    });
    return announcements;
  }

  async searchAnnouncementByKeyword(search) {
    let result;
    if (typeof search === 'number') {
      result = await this.prisma.job.findMany({
        where: {
          compensation: {
            lte: +search,
          },
        },
        select: {
          job_id: true,
          Company: {
            select: {
              name: true,
              nation: true,
              region: true,
            },
          },
          position: true,
          compensation: true,
          tech: true,
        },
      });
    } else {
      result = await this.prisma.job.findMany({
        where: {
          OR: [
            {
              Company: {
                name: {
                  search: `${search}`,
                },
              },
            },
            {
              Company: {
                nation: {
                  search: `${search}`,
                },
              },
            },
            {
              Company: {
                region: {
                  search: `${search}`,
                },
              },
            },
            {
              position: {
                search: `${search}`,
              },
            },
            {
              content: {
                search: `${search}`,
              },
            },
            {
              tech: {
                search: `${search}`,
              },
            },
          ],
        },
      });
    }
    if (!result) {
      throw new NotFoundException('공고가 존재하지 않습니다.');
    }
    return result;
  }

  async getAnnouncementById(id) {
    const { company_id } = await this.findCompany(id);
    return await this.prisma.job.findMany({
      where: {
        company_id,
      },
    });
  }

  async findCompany(company_id) {
    const company = await this.prisma.company.findFirst({
      where: {
        company_id,
      },
    });
    if (!company) {
      throw new NotFoundException('존재하지 않는 회사명입니다.');
    }
    return company;
  }

  async updateAnnouncement(job_id, payload) {
    const result = await this.prisma.$transaction([
      this.prisma.job.update({
        where: {
          job_id,
        },
        data: {
          position: payload.position,
          compensation: +payload.compensation,
          content: payload.content,
          tech: payload.tech,
        },
        select: {
          position: true,
          compensation: true,
          content: true,
          tech: true,
        },
      }),
    ]);
    return result;
  }

  async deleteAnnouncement(job_id) {
    return await this.prisma.job.delete({
      where: {
        job_id,
      },
    });
  }
}
