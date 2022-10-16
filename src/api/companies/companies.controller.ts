import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  async createCompany(@Body() body: CreateCompanyDto) {
    return this.companiesService.createCompany(
      body.name,
      body.nation,
      body.region,
    );
  }

  @Get()
  async getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Get(':id')
  async getCompanyById(@Param('id', ParseIntPipe) id) {
    return this.companiesService.getCompanyById(id);
  }
}
