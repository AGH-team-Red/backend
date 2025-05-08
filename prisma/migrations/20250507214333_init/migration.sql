-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('active', 'pending', 'completed', 'expired');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('labeling', 'cross_checking', 'taking_picture');

-- CreateEnum
CREATE TYPE "LabelingLanguage" AS ENUM ('pl', 'en');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "budget" DOUBLE PRECISION NOT NULL,
    "labelingLanguage" "LabelingLanguage" NOT NULL,
    "datasetDescription" TEXT NOT NULL,
    "exampleImageUrl" TEXT NOT NULL,
    "imageGuidelines" TEXT NOT NULL,
    "minSamplesCount" INTEGER NOT NULL,
    "currentSamplesCount" INTEGER NOT NULL DEFAULT 0,
    "entryFee" DOUBLE PRECISION,
    "reward" DOUBLE PRECISION,
    "minContributors" INTEGER,
    "contributors" INTEGER DEFAULT 0,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "labelGuidelines" TEXT NOT NULL,
    "exampleLabel" TEXT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "estimatedReward" DOUBLE PRECISION NOT NULL,
    "assignedToId" TEXT,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabelTask" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "LabelTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureLabel" (
    "id" SERIAL NOT NULL,
    "labelTaskId" TEXT NOT NULL,
    "featureId" INTEGER NOT NULL,
    "featureLabel" TEXT NOT NULL,

    CONSTRAINT "FeatureLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckTask" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "isCorrect" BOOLEAN,

    CONSTRAINT "CheckTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckFeature" (
    "id" SERIAL NOT NULL,
    "checkTaskId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "CheckFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PictureTask" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "exampleImgUrl" TEXT,

    CONSTRAINT "PictureTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabelTask_taskId_key" ON "LabelTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckTask_taskId_key" ON "CheckTask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "PictureTask_taskId_key" ON "PictureTask"("taskId");

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelTask" ADD CONSTRAINT "LabelTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureLabel" ADD CONSTRAINT "FeatureLabel_labelTaskId_fkey" FOREIGN KEY ("labelTaskId") REFERENCES "LabelTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureLabel" ADD CONSTRAINT "FeatureLabel_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckTask" ADD CONSTRAINT "CheckTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckFeature" ADD CONSTRAINT "CheckFeature_checkTaskId_fkey" FOREIGN KEY ("checkTaskId") REFERENCES "CheckTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PictureTask" ADD CONSTRAINT "PictureTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
