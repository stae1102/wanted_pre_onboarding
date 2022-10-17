import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body('name') name: string) {
    return this.usersService.createUser(name);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @UsePipes(ParseIntPipe)
  @Post('/:id/announcement')
  applyToAnnouncement(@Param('id') id: number, @Query('jobId') jobId: number) {
    return this.usersService.applyToAnnouncement(id, jobId);
  }
}
