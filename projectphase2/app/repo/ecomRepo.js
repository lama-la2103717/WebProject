import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class EcomRepo{

    async getUsers(){
        try {
            return prisma.user.findMany()
        } catch (error) {
            return { error: error.message }
 
        }
    }
    async getproductsbyBrand(brandName){
        try {
            return prisma.product.findMany({
                where: {brand: {contains: brandName.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}}
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
                where: {id},
                include: {prodPurchases:true}
            })
        } catch (error) {
            return {error: error.message}

        }
    }
    async getSaleHistory(name){
        try {
            return prisma.purchaseHistory.findMany({
                where: {brandName: {contains: name.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}},
                include:{Product: true, User : true}
                
            })
        } catch (error) {
            return {error: error.message}

        }
    }
    async getSaleHistoryById(id){

        return prisma.product.findMany({
            where: {productId: id},
            include:{prodPurchases:true}
        })
    } catch (error) {
        return {error: error.message}

    }
    async getCustomerHistoryByName(name){
        return prisma.user.findFirst({
            where: {username: name},
            include:{userPurchases:true}
        })
    } catch (error) {
        return {error: error.message}
    //     return prisma.purchaseHistory.findMany({
    //         where: {productId: id}
    //     })
    // } catch (error) {
    //     return {error: error.message}

    // }
    }
    
    }
    
export default new EcomRepo()