import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class EcomRepo{

    async getproductsbyBrand(brandName){
        try {
            brandName.join()
            return prisma.product.findMany({
                where: {brand: {contains: brandName}}
            })
            
        } catch (error) {
            return {error: error.message}

        }
    }

    async getProducts(){
        try {
            return prisma.product.findMany()
        } catch (error) {
            return { error: error.message }
 
        }
    }
    async getUsers(){
        try {
            return prisma.user.findMany()
        } catch (error) {
            return { error: error.message }
 
        }
    }

    async getUser(userId){
        try{
            return prisma.user.findUnique(
                { where: { userId } }
            )
        } catch (error) {
            return { error: error.message }
     
        }
    }
     
    async getPurchases(userId) {
        try {
            return prisma.purchaseHistory.findMany(
                { where: { userId } }
            )
        } catch (error) {
            return { error: error.message }
        }
    }
    async updateUser(userId, user) {
        try {
            return await prisma.user.update({
                where: { userId },
                data: user
            });
        } catch (error) {
            return { error: error.message };
        }
    }
     
     
    async addPurchase(userId, purchaseHistory) {
        purchaseHistory.userId = userId;
        purchaseHistory.price = parseFloat(purchaseHistory.price.toString());
        purchaseHistory.quantity = parseFloat(purchaseHistory.quantity.toString());
        
        try {
            const user = await this.getUser(userId); // Corrected to await
     
            // Calculate total purchase price
            const totalPurchasePrice = purchaseHistory.price * purchaseHistory.quantity;
     
            // Check if user has sufficient balance
            if (user.balance >= totalPurchasePrice) {
                user.balance -= totalPurchasePrice; // Deduct total purchase price from user balance
            } else {
                return { error: "Insufficient Balance" };
            }
     
            await this.updateUser(userId, user); // Corrected to await
     
            const createdPurchase = await prisma.purchaseHistory.create({ data: purchaseHistory });
            return createdPurchase;
        } catch (error) {
            return { error: error.message };
        }
    }
}
export default new EcomRepo()