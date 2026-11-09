-- CreateTable
CREATE TABLE "JobOpening" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOpening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobOpening_title_key" ON "JobOpening"("title");

-- CreateIndex
CREATE INDEX "JobOpening_status_idx" ON "JobOpening"("status");
