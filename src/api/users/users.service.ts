import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(name: string) {
    return await this.prisma.user.create({
      data: {
        name,
      },
    });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
  }

  async applyToAnnouncement(user_id: number, job_id: number) {
    const exist = await this.prisma.user.findFirst({
      where: {
        JobUsers: {
          some: {
            user_id,
          },
        },
      },
    });
    if (exist) {
      throw new BadRequestException('이미 지원한 공고입니다.');
    }
    const result = await this.prisma.jobUser.create({
      data: {
        user_id,
        job_id,
      },
      select: {
        user_id: true,
        job_id: true,
      },
    });
    return result;
  }
}
