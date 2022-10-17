import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [JobsModule, CompaniesModule, UsersModule],
})
export class ApiModule {}
