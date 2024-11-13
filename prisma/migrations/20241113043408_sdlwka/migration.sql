-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('view', 'add_to_cart', 'purchase');

-- CreateTable
CREATE TABLE "ProductInteraction" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "interactionType" "InteractionType" NOT NULL,
    "userId" INTEGER,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductInteraction_productId_interactionType_idx" ON "ProductInteraction"("productId", "interactionType");

-- AddForeignKey
ALTER TABLE "ProductInteraction" ADD CONSTRAINT "ProductInteraction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
