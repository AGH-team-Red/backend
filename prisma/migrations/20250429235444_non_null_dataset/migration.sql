-- CreateEnum
CREATE TYPE "LabelingLanguage" AS ENUM ('pl', 'en');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "budget" DECIMAL(10,2) NOT NULL,
    "labelingLanguage" "LabelingLanguage" NOT NULL,
    "datasetId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dataset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minSamplesCount" INTEGER NOT NULL,

    CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatasetFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageGuidelines" TEXT NOT NULL,
    "labelGuidelines" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,

    CONSTRAINT "DatasetFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatasetFeatureExample" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "DatasetFeatureExample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_datasetId_key" ON "Order"("datasetId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatasetFeature" ADD CONSTRAINT "DatasetFeature_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatasetFeatureExample" ADD CONSTRAINT "DatasetFeatureExample_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "DatasetFeature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
