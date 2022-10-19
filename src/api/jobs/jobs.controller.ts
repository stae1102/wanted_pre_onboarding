import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger/dist';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiResponse({
    status: 200,
    description: '성공, 모든 채용공고 반환',
  })
  @ApiOperation({ summary: '모든 공고를 가져옵니다' })
  @Get()
  getAllAnnouncement() {
    return this.jobsService.getAllAnnouncement();
  }

  @ApiResponse({
    status: 201,
    description: '성공, 등록된 공고 반환',
  })
  @ApiParam({
    name: 'companyId',
    type: Number,
    example: 1,
    description: '회사 아이디',
  })
  @ApiOperation({ summary: '채용공고 등록' })
  @Post('/:companyId')
  createAnnouncement(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() body: CreateAnnouncementDto,
  ) {
    return this.jobsService.createAnnouncement(companyId, body);
  }

  @ApiResponse({
    status: 200,
    description: '성공, 채용공고 상세 내용 및 동일 회사 타 공고 반환',
  })
  @ApiParam({
    name: 'jobId',
    type: Number,
    example: 1,
    description: '채용공고 아이디',
  })
  @ApiOperation({ summary: '채용공고 상세 조회' })
  @Get('announce/:jobId')
  getSpecificAnnouncement(@Param('jobId', ParseIntPipe) jobId) {
    return this.jobsService.getSpecificAnnouncement(jobId);
  }

  @ApiResponse({
    status: 200,
    description: '성공, 삭제된 공고 반환',
  })
  @ApiParam({
    name: 'jobId',
    type: Number,
    example: 1,
    description: '채용공고 아이디',
  })
  @ApiOperation({ summary: '채용공고 삭제' })
  @Delete('/:jobId')
  deleteAnnouncement(@Param('jobId', ParseIntPipe) jobId) {
    return this.jobsService.deleteAnnouncement(jobId);
  }

  @ApiResponse({
    status: 200,
    description: '성공, 쿼리스트링 단어 포함 공고 반환',
  })
  @ApiQuery({
    name: 'search',
    type: String || Number,
    example: 1500000 || '백엔드',
    description: '채용공고 키워드',
  })
  @ApiOperation({ summary: '채용공고 검색' })
  @Get('feat')
  searchAnnouncementByKeyword(@Query('search') search) {
    return this.jobsService.searchAnnouncementByKeyword(search);
  }

  @ApiResponse({
    status: 200,
    description: '성공, 해당 회사의 채용공고 반환',
  })
  @ApiParam({
    name: 'companyId',
    type: Number,
    example: 1,
    description: '회사 아이디',
  })
  @ApiOperation({ summary: '해당 회사의 채용공고 조회' })
  @Get('/:companyId')
  getAnnouncementById(@Param('companyId', ParseIntPipe) companyId) {
    return this.jobsService.getAnnouncementById(companyId);
  }

  @ApiResponse({
    status: 200,
    description: '성공, 수정한 채용공고 내용 반환',
  })
  @ApiParam({
    name: 'jobId',
    type: Number,
    example: 1,
    description: '채용공고 아이디',
  })
  @ApiOperation({ summary: '채용공고 수정' })
  @Patch('/:jobId')
  updateAnnouncement(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() body: CreateAnnouncementDto,
  ) {
    return this.jobsService.updateAnnouncement(jobId, body);
  }
}
