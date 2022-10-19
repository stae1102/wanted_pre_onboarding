import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    example: '원티드랩',
    description: '회사 이름',
  })
  name: string;

  @ApiProperty({
    example: '한국',
    description: '회사 국가',
  })
  nation?: string;

  @ApiProperty({
    example: '서울',
    description: '회사 지역',
  })
  region?: string;
}
