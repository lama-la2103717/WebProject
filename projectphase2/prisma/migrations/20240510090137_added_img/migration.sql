-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PurchaseHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "datePurchased" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PurchaseHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PurchaseHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PurchaseHistory" ("brandName", "datePurchased", "id", "price", "productId", "quantity", "userId") SELECT "brandName", "datePurchased", "id", "price", "productId", "quantity", "userId" FROM "PurchaseHistory";
DROP TABLE "PurchaseHistory";
ALTER TABLE "new_PurchaseHistory" RENAME TO "PurchaseHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
