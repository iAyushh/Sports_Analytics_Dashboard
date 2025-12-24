-- CreateTable
CREATE TABLE "userMeta" (
    "user_id" INTEGER NOT NULL,
    "password_salt" TEXT,
    "password_hash" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "userMeta_user_id_key" ON "userMeta"("user_id");

-- AddForeignKey
ALTER TABLE "userMeta" ADD CONSTRAINT "userMeta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
