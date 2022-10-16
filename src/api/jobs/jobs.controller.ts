import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  createAnnouncement(@Body() body: CreateAnnouncementDto) {
    return this.jobsService.createAnnouncement(body);
  }

  @Get()
  getAllAnnouncement() {
    return this.jobsService.getAllAnnouncement();
  }

  @Get('feat')
  searchAnnouncementByKeyword(@Query('search') search) {
    return this.jobsService.searchAnnouncementByKeyword(search);
  }

  @Get('/:companyId')
  getAnnouncementById(@Param('companyId', ParseIntPipe) companyId) {
    return this.jobsService.getAnnouncementById(companyId);
  }

  @Patch('/:jobId')
  updateAnnouncement(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() body: CreateAnnouncementDto,
  ) {
    return this.jobsService.updateAnnouncement(jobId, body);
  }
}
