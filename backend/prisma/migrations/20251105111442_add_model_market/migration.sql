-- CreateEnum
CREATE TYPE "MarketStatus" AS ENUM ('resolved', 'active', 'close');

-- CreateEnum
CREATE TYPE "MarketOutcome" AS ENUM ('OutcomeA', 'OutcomeB', 'Niether');

-- CreateTable
CREATE TABLE "market" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "MarketStatus" NOT NULL,
    "Outcome" "MarketOutcome" NOT NULL,
    "volume" BIGINT NOT NULL,
    "yesPrice" INTEGER NOT NULL,
    "noPrice" INTEGER NOT NULL,

    CONSTRAINT "market_pkey" PRIMARY KEY ("id")
);
