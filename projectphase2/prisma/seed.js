import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//team and player path
const userPath = path.join(process.cwd(), 'app/data/users.json')
const purchasePath = path.join(process.cwd(), 'app/data/purchasehistory.json')
const productPath = path.join(process.cwd(), 'app/data/products.json')

async function intializeDB() {
    try {
        const users = await fs.readJSON(userPath)
        const products = await fs.readJSON(productPath)
        const purchases = await fs.readJSON(purchasePath)

        
        // // createMany is not supported for SQLite. Use create instead
        for (const user of users) await prisma.user.create({ data: user })
        for (const product of products) await prisma.product.create({ data: product })
        for (const purchase of purchases) await prisma.purchaseHistory.create({ data: purchase })

        return true
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}
const success = await intializeDB()
if(success)
console.log("Database intialized")
else
console.log("Database not intialized")



// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })