import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import { TechModule } from './tech/tech.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [JobsModule, CompaniesModule, UsersModule, TechModule],
})
export class ApiModule {}
