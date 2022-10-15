-- CreateTable
CREATE TABLE "Job" (
    "job_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "compensation" INTEGER NOT NULL DEFAULT 500000,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "company_id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "nation" VARCHAR(12) NOT NULL DEFAULT '한국',
    "region" VARCHAR(20) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "JobUser" (
    "job_user_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "JobUser_pkey" PRIMARY KEY ("job_user_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(12) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Position" (
    "position_id" SERIAL NOT NULL,
    "position" VARCHAR(15) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "Tech" (
    "tech_id" SERIAL NOT NULL,
    "name" VARCHAR(12) NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("tech_id")
);

-- CreateTable
CREATE TABLE "JobPosition" (
    "job_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("job_id","position_id")
);

-- CreateTable
CREATE TABLE "CompanyPosition" (
    "company_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "CompanyPosition_pkey" PRIMARY KEY ("company_id","position_id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobUser" ADD CONSTRAINT "JobUser_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobUser" ADD CONSTRAINT "JobUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosition" ADD CONSTRAINT "JobPosition_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosition" ADD CONSTRAINT "JobPosition_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPosition" ADD CONSTRAINT "CompanyPosition_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPosition" ADD CONSTRAINT "CompanyPosition_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;
