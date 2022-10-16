import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TechService {
  constructor(private readonly prisma: PrismaService) {}

  async createTech(tech) {
    const exist = await this.getTechs(tech);
    if (exist) {
      throw new BadRequestException('이미 존재하는 기술 스택입니다.');
    }
    return this.prisma.tech.create({
      data: {
        name: tech,
      },
    });
  }

  getTechs(tech) {
    return this.prisma.tech.findMany({
      where: {
        name: tech,
      },
    });
  }
}
