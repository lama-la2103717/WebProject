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
    async getProductByTitle(title){
        try {
            return prisma.product.findUnique({
                where: { title: title }
            })
        } catch (error) {
            return { error: error.message }
        }

    }
    async getProductByUsername(name){
        try {
            return prisma.product.findUnique({
                where: { brand: name }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async addProduct(product) {
        try {
            return prisma.product.create({
                data: product
            })
        } catch (error) {
            return { error: error.message }
        }
    }





}
export default new EcommRepo()