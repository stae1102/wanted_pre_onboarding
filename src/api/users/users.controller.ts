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
import { ApiTags } from '@nestjs/swagger';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger/dist';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: '성공, 유저 등록 데이터 저장 및 해당 데이터 반환',
  })
  @ApiOperation({ summary: '유저 등록' })
  @ApiBody({
    type: String,
  })
  @Post()
  createUser(@Body('name') name: string) {
    return this.usersService.createUser(name);
  }

  @ApiResponse({
    status: 200,
    description: '성공, 특정 아이디 유저 반환',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '유저 아이디',
  })
  @ApiOperation({ summary: '아이디로 유저 조회' })
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiResponse({
    status: 201,
    description: '성공, 유저 아이디와 해당 채용공고 아이디 반환',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '유저 아이디',
  })
  @ApiQuery({
    name: 'jobId',
    type: Number,
    example: 1,
    description: '채용공고 아이디',
  })
  @ApiOperation({ summary: '유저 채용공고 등록' })
  @UsePipes(ParseIntPipe)
  @Post('/:id/announcement')
  applyToAnnouncement(@Param('id') id: number, @Query('jobId') jobId: number) {
    return this.usersService.applyToAnnouncement(id, jobId);
  }
}
