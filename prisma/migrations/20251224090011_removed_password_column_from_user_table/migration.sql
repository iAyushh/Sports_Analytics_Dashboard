/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "user_meta" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_meta_pkey" PRIMARY KEY ("id");
