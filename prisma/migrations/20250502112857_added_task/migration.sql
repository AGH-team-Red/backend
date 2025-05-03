-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('labeling', 'crossChecking');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_datasetId_key" ON "Task"("datasetId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
