import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class EcommRepo{
    async getBrands(){
        try {
            return prisma.user.findMany(
            {  where: {type: "seller"}}
            )
        } catch (error) {
            return { error: error.message }
        }
    }
    async getProducts(){
        try {
            return prisma.product.findMany()
        } catch (error) {
            return { error: error.message }

        }
    }
    async getTopProducts(){
        try {
            return prisma.product.findMany(
                {
                    orderBy: { rating: "desc" } ,
                    take: 8

                }
            )

        } catch (error) {
            return { error: error.message }

        }
    }
}
export default new EcommRepo()