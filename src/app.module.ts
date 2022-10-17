import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './api/jobs/jobs.module';
import { CompaniesModule } from './api/companies/companies.module';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ApiModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
