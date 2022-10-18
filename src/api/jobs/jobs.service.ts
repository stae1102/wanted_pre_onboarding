import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnnouncement(company_id: number, payload: CreateAnnouncementDto) {
    const exist = await this.findCompany(company_id);
    if (!exist) {
      throw new NotFoundException('존재하지 않는 회사입니다.');
    }
    const result = await this.prisma.$transaction([
      this.prisma.job.create({
        data: {
          company_id,
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
    return announcements;
  }

  async searchAnnouncementByKeyword(search: number | string) {
    let result: Array<object>;
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
                  contains: search,
                },
              },
            },
            {
              Company: {
                nation: {
                  contains: search,
                },
              },
            },
            {
              Company: {
                region: {
                  contains: search,
                },
              },
            },
            {
              position: {
                contains: search,
              },
            },
            {
              tech: {
                contains: search,
              },
            },
          ],
        },
      });
    }
    if (result.length < 1) {
      throw new NotFoundException('공고가 존재하지 않습니다.');
    }
    return result;
  }

  async getAnnouncementById(company_id) {
    const result = await this.prisma.job.findMany({
      where: {
        company_id,
      },
    });
    if (result.length < 1) {
      throw new NotFoundException('해당 회사의 취업 공고가 없습니다.');
    }
    return result;
  }

  async findCompany(company_id) {
    return await this.prisma.company.findFirst({
      where: {
        company_id,
      },
    });
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

  async getSpecificAnnouncement(job_id) {
    const result = await this.prisma.job.findUnique({
      where: {
        job_id,
      },
      select: {
        job_id: true,
        position: true,
        compensation: true,
        tech: true,
        content: true,
        Company: true,
      },
    });
    if (!result) {
      throw new NotFoundException('공고가 존재하지 않습니다');
    }
    const otherAnnouncment = await this.prisma.job.findMany({
      where: {
        Company: {
          company_id: result.Company.company_id,
        },
      },
      select: {
        job_id: true,
      },
    });
    result['other_job_id'] = otherAnnouncment.map((data) => data.job_id);
    return result;
  }
}
