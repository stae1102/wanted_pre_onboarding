import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @ApiResponse({
    status: 201,
    description: '성공, 회사 등록 후 해당 데이터 반환',
  })
  @ApiOperation({ summary: '회사 등록' })
  @Post()
  async createCompany(@Body() body: CreateCompanyDto) {
    return this.companiesService.createCompany(
      body.name,
      body.nation,
      body.region,
    );
  }

  @ApiResponse({
    status: 200,
    description: '성공, 모든 회사 데이터 반환',
  })
  @ApiOperation({ summary: '모든 회사 조회' })
  @Get()
  async getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @ApiResponse({
    status: 200,
    description: '성공, 특정 회사 데이터 반환',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '회사 아이디',
  })
  @ApiOperation({ summary: '아이디를 사용하여 특정 회사 조회' })
  @Get(':id')
  async getCompanyById(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.getCompanyById(id);
  }
}
