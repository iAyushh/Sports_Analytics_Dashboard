-- CreateTable
CREATE TABLE "user_meta" (
    "password_salt" TEXT,
    "password_hash" TEXT,
    "user_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_meta_user_id_key" ON "user_meta"("user_id");

-- AddForeignKey
ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
