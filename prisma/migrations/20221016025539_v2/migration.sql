/*
  Warnings:

  - You are about to drop the column `position_id` on the `Tech` table. All the data in the column will be lost.
  - You are about to drop the `CompanyPosition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPosition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `position` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyPosition" DROP CONSTRAINT "CompanyPosition_company_id_fkey";

-- DropForeignKey
ALTER TABLE "CompanyPosition" DROP CONSTRAINT "CompanyPosition_position_id_fkey";

-- DropForeignKey
ALTER TABLE "JobPosition" DROP CONSTRAINT "JobPosition_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobPosition" DROP CONSTRAINT "JobPosition_position_id_fkey";

-- DropForeignKey
ALTER TABLE "JobUser" DROP CONSTRAINT "JobUser_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Tech" DROP CONSTRAINT "Tech_position_id_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "region" SET DEFAULT '서울';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "position" VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE "Tech" DROP COLUMN "position_id";

-- DropTable
DROP TABLE "CompanyPosition";

-- DropTable
DROP TABLE "JobPosition";

-- DropTable
DROP TABLE "Position";

-- CreateTable
CREATE TABLE "JobTech" (
    "job_id" INTEGER NOT NULL,
    "tech_id" INTEGER NOT NULL,

    CONSTRAINT "JobTech_pkey" PRIMARY KEY ("job_id","tech_id")
);

-- AddForeignKey
ALTER TABLE "JobUser" ADD CONSTRAINT "JobUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTech" ADD CONSTRAINT "JobTech_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTech" ADD CONSTRAINT "JobTech_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "Tech"("tech_id") ON DELETE RESTRICT ON UPDATE CASCADE;
