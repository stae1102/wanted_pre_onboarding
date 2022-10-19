import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateAnnouncementDto {
  @ApiProperty({
    example: 1,
    description: '회사 아이디',
  })
  company_id: number;

  @ApiProperty({
    example: '백엔드 개발자',
    description: '채용 포지션',
  })
  position: string;

  @ApiProperty({
    example: 1500000,
    description: '채용 보상금',
  })
  compensation: number;

  @ApiProperty({
    example: '백엔드 개발자를 모집합니다.',
    description: '채용공고 내용',
  })
  content: string;

  @ApiProperty({
    example: 'Node.js',
    description: '채용공고 기술',
  })
  tech: string;
}
