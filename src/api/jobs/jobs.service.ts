import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnnouncement(payload: CreateAnnouncementDto) {
    // const result = await this.prisma.$transaction([
    //   this.prisma.job.create({
    //     data: {
    //       compnay,
    //     },
    //   }),
    // ]);
  }
}
