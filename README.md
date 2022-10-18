# 요구 사항 분석 및 구현 과정

## 1. DB 세팅

DB 세팅을 위해서 ERD를 작성하였습니다.

![pre-onboarding](https://user-images.githubusercontent.com/83271772/196350572-7fa86a54-8521-47ee-9c92-252bda0f6c5f.png)

채용공고와 사용자, 회사, 기술 총 네 가지의 주 테이블을 만들었으며, 중간 테이블인 채용공고*사용자, 채용공고*기술의 테이블을 만들었습니다.

### 1:N

- 회사는 여러 개의 공고를 낼 수 있으므로, 회사와 채용공고의 테이블 관계를 1:N으로 설정했습니다.

### N:M

- 각 채용공고별로 기술이 여러 개 쓰일 수 있고, 같은 기술이 여러 개의 채용공고에 적용될 수 있으므로 N:M 관계로 설정했습니다.
- 같은 이유로 채용공고도 사용자와 N:M 관계로 설정했습니다.

## 2. 사용 기술

- 웹 프레임워크: `NestJS`
- RDBMS: `Postgresql`
- ORM: `Prisma`

```
"dependencies": {
  "@nestjs/common": "^9.0.0",
  "@nestjs/config": "^2.2.0",
  "@nestjs/core": "^9.0.0",
  "@nestjs/mapped-types": "*",
  "@nestjs/platform-express": "^9.0.0",
  "@prisma/client": "^4.4.0",
  "class-validator": "^0.13.2",
  "prisma": "^4.4.0",
  "reflect-metadata": "^0.1.13",
  "rimraf": "^3.0.2",
  "rxjs": "^7.2.0"
},
"devDependencies": {
  "@nestjs/cli": "^9.0.0",
  "@nestjs/schematics": "^9.0.0",
  "@nestjs/testing": "^9.0.0",
  "@types/express": "^4.17.13",
  "@types/jest": "28.1.8",
  "@types/node": "^16.0.0",
  "@types/supertest": "^2.0.11",
  "@typescript-eslint/eslint-plugin": "^5.0.0",
  "@typescript-eslint/parser": "^5.0.0",
  "eslint": "^8.0.1",
  "eslint-config-prettier": "^8.3.0",
  "eslint-plugin-prettier": "^4.0.0",
  "husky": "^8.0.1",
  "jest": "28.1.3",
  "jest-mock-extended": "^3.0.1",
  "lint-staged": "^13.0.3",
  "prettier": "^2.3.2",
  "source-map-support": "^0.5.20",
  "supertest": "^6.1.3",
  "ts-jest": "28.0.8",
  "ts-loader": "^9.2.3",
  "ts-node": "^10.0.0",
  "tsconfig-paths": "4.1.0",
  "typescript": "^4.7.4"
}
```

## 3. API 설정

### 1. 채용공고 등록

간단하게 채용공고를 위해서 회사 아이디를 라우트 파라미터로 받아서 채용공고를 등록합니다. 그리고, 세부 채용공고는 HTTP 패킷을 통해서 받습니다.

- `POST /api/jobs/:companyId`

```
createAnnouncement(
  @Param('companyId', ParseIntPipe) companyId: number,
  @Body() body: CreateAnnouncementDto,
)
```

### 2. 채용공고 수정

채용공고를 수정하기 위해서 수정 내용을 HTTP 패킷 바디로 받습니다. Prisma에서는 수정할 내용이 없으면 원본 값을 그대로 유지하므로, 채용공고의 포지션, 보상금, 내용, 사용기술을 모두 body 값으로 업데이트 합니다.

이때, 채용공고를 찾기 위해서 라우트 파라미터로 채용공고 id를 받았습니다.

- `PATCH /api/jobs/:jobId`

```
updateAnnouncement(
  @Param('jobId', ParseIntPipe) jobId: number,
  @Body() body: CreateAnnouncementDto,
)
```

### 3. 채용공고 삭제

채용공고를 삭제하기 위해서 채용공고 id를 라우트 파라미터로 받고 서비스에 그 값을 전달합니다. 그러면 서비스는 그 값을 사용해서 ORM where를 통해서 일치하는 채용공고를 삭제해줍니다.

- DELETE /api/jobs/:jobId

```
deleteAnnouncement(@Param('jobId', ParseIntPipe) jobId)
```

### 4. 채용공고 목록 조회

#### 1. 채용공고 목록 조회

ORM의 findMany를 사용하여 원하는 채용공고를 가져옵니다. 이때, 요구사항에 사용자가 지원한 채용공고가 아니라 단순한 채용공고 목록을 조회하는 것이므로, job 라우터에서 모든 채용공고 목록을 가져오도록 경로를 작성했습니다.

- `GET /api/jobs`

```
getAllAnnouncement()
```

---

#### 2. 채용공고 검색 기능

채용공고를 검색하기 위해 키워드를 쿼리로 받습니다. 그리고 서비스에서는 받은 값의 자료형이 문자열인지 정수형인지에 따라서 로직을 분류합니다. 쿼리스트링 값이 정수형이라면, 보상금을 검색하는 목적이므로 보상금을 검색합니다. 이때, 보상금이 완전히 일치하는 것보다는, 그 이상의 값을 받는 것이 좋아보였습니다.

두 번째로 문자열일 때는 보상금을 제외한 나머지 모든 것을 검색해야 하므로, ORM의 where 옵션에서 OR을 사용해 모든 컬럼을 검사했습니다. 처음에는 Prisma의 search를 사용했으나, 단어 단위로 탐색하다보니 '프론트엔드'와 '프론트'를 다르게 처리하여 정상적으로 출력하지 못했습니다. 그래서 contains 옵션으로 바꿔 검사했습니다.

- `GET /api/jobs/feat?search=value`

```
searchAnnouncementByKeyword(@Query('search') search)
```

### 5. 채용 상세 페이지 열람

채용 상세 페이지는 기존 DB에 있는 컬럼들을 원하는 대로 선택하여 조회할 수 있습니다. 이때, 회사가 올린 다른 채용공고를 찾기 위해서, 일단 채용공고를 통해 회사 id를 찾아낸 후, 그 회사 id를 where에 사용하여 다른 채용공고를 가져왔습니다. 그후에 채용공고 객체에 값을 추가하여 구현하였습니다.

- `GET /api/announcement/:jobId`

```
getSpecificAnnouncement(@Param('jobId', ParseIntPipe) jobId)
```

### 6. 채용공고 지원

채용공고 지원은 유저 컨트롤러에서 처리하였고, 채용공고\_사용자 테이블에서 값을 조회하여 이미 지원하였으면 예외를 반환하고, 그렇지 않으면 채용공고에 지원할 수 있도록 JobUser 테이블에 값을 추가했습니다.

- `POST /api/users/:id/announcement`

```
applyToAnnouncement(@Param('id') id: number, @Query('jobId') jobId: number)
```

# 아쉬웠던 점

- ERD를 조금 더 확장성있게 구현하지 못한 것이 아까웠습니다.
- 라우트 경로를 조금 더 체계적으로 작성하지 못한 점이 아쉬웠습니다.
