-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('player', 'master', 'admin');

-- CreateEnum
CREATE TYPE "event_status" AS ENUM ('open', 'closed', 'cancelled');

-- CreateEnum
CREATE TYPE "bet_outcome" AS ENUM ('win', 'loose', 'pending');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "user_type" "UserRole" NOT NULL DEFAULT 'player',
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "sport" TEXT NOT NULL,
    "status" "event_status" NOT NULL DEFAULT 'closed',
    "event_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "bets" (
    "bet_id" SERIAL NOT NULL,
    "bet_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bet_amount" DECIMAL(65,30) NOT NULL,
    "bet_outcome" "bet_outcome" NOT NULL DEFAULT 'pending',
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("bet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
