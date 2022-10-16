import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  createAnnouncement(@Body() body: CreateAnnouncementDto) {
    return this.jobsService.createAnnouncement(body);
  }
}
