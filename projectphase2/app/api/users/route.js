
import ecomRepo from "@/app/repo/ecomRepo";

export async function POST(request, { params }) {
    const userId = params.userId
    const purchaseHistory = await request.json()
    const response = await ecomRepo.addPurchase(userId, purchaseHistory)
    return Response.json(response)
}


export async function GET(request) {
    const products = await ecomRepo.getUsers();
    return Response.json(products, { status: 200 })
}