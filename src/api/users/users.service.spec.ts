import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    usersService = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('createUser => returns user', () => {
    const user = {
      user_id: 1,
      name: '테스트',
    };
    const name = '테스트';

    prisma.user.create.mockResolvedValueOnce(user);
    expect(usersService.createUser(name)).resolves.toEqual(user);
  });

  it('getUserById => return user', () => {
    const user = {
      user_id: 1,
      name: '테스트',
    };
    const id = 1;

    prisma.user.findUnique.mockResolvedValueOnce(user);
    expect(usersService.getUserById(id)).resolves.toEqual(user);
  });

  it('applyToAnnouncement => return jobUser record', () => {
    const exist = null;
    const user_id = 1;
    const job_id = 1;
    const result = {
      user_id,
      job_id,
    };

    prisma.user.findFirst.mockResolvedValueOnce(exist);
    prisma.jobUser.create.mockResolvedValue(result as any);
    expect(
      usersService.applyToAnnouncement(user_id, job_id),
    ).resolves.toStrictEqual({
      user_id: 1,
      job_id: 1,
    });
  });
});
