/*
  Warnings:

  - You are about to drop the `user_meta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_meta" DROP CONSTRAINT "user_meta_user_id_fkey";

-- DropTable
DROP TABLE "user_meta";
