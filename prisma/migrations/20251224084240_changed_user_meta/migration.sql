/*
  Warnings:

  - You are about to drop the `userMeta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userMeta" DROP CONSTRAINT "userMeta_user_id_fkey";

-- DropTable
DROP TABLE "userMeta";

-- CreateTable
CREATE TABLE "user_meta" (
    "user_id" INTEGER NOT NULL,
    "password_salt" TEXT,
    "password_hash" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "user_meta_user_id_key" ON "user_meta"("user_id");

-- AddForeignKey
ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
