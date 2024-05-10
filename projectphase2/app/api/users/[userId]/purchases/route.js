import ecommRepo from "@/app/repo/ecommRepo";

export async function POST(request, { params }) {
    const userId = params.userId
    const purchaseHistory = await request.json()
    const response = await ecommRepo.addPurchase(userId, purchaseHistory)
    return Response.json(response)
}
export async function GET(request, { params }) {
    const userId= params.userId
    const purchaseHistory = await ecommRepo.getPurchases(userId)
    return Response.json(purchaseHistory)
}