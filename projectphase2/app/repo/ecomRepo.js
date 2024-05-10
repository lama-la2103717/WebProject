import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class EcomRepo{

    async getproductsbyBrand(brandName){
        try {
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
                { where: {userId} }
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
        try {
            // Ensure data consistency
            purchaseHistory.price = parseFloat(purchaseHistory.price);
            purchaseHistory.quantity = parseInt(purchaseHistory.quantity);

            
            const totalPurchasePrice = purchaseHistory.price * purchaseHistory.quantity;
    
           
            const user = await this.getUser(userId);
    
            if (user.balance < totalPurchasePrice) {
                return { error: "Insufficient Balance" };
            }

            user.balance -= totalPurchasePrice;

            await this.updateUser(userId, user);
    
  
            const createdPurchase = await prisma.purchaseHistory.create({ data: purchaseHistory });
    
            return createdPurchase;
        } catch (error) {
            return { error: error.message };
        }
    }

    async updateProduct(id, product){
        try {
            return prisma.product.update(
                {
                    where: {id},
                    data: product
                }
            )
        } catch (error) {
            return {error: error.message}
  
        }
       
    }
    async addProduct(product){
        try {
            return prisma.product.create({
                data: product
            })
            
        } catch (error) {
            return {error: error.message}

        }
        
    }
    async getProductById(id){
        try {
            return prisma.product.findUnique({
                where: {id}
            })
        } catch (error) {
            return {error: error.message}

        }
    }
    async getSaleHistory(brandName){
        try {
            return prisma.purchaseHistory.findMany({
                where: {brandName: {contains: brandName}}
                
            })
        } catch (error) {
            return {error: error.message}

        }
    }
    async getSaleHistoryById(id){
        return prisma.purchaseHistory.findMany({
            where: {productId: id}
        })
    } catch (error) {
        return {error: error.message}

    }
    async getCustomerHistoryByName(name){
        return prisma.user.findMany({
            where: {username: name},
            include:{userPurchases:true}
        })
    } catch (error) {
        return {error: error.message}
    }
    
    }
    
export default new EcomRepo()