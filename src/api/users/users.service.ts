import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(name: string) {
    return await this.prisma.user.create({
      data: {
        name,
      },
    });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });
  }
}
