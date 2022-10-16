import { Body, Controller, Post } from '@nestjs/common';
import { TechService } from './tech.service';

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Post()
  async createTech(@Body('tech') tech) {
    return this.techService.createTech(tech);
  }
}
