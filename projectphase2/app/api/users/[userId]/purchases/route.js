import ecomRepo from "@/app/repo/ecomRepo";


export async function POST(request, { params }) {
    const userId = params.userId;
    const purchaseHistory = await request.json();
    const response = await ecomRepo.addPurchase(userId, purchaseHistory);
    return Response.json(response);
}
export async function GET(request, { params }) {
    const userId = params.userId;
    try {
        const purchases = await ecomRepo.getPurchases(userId);
        return new Response(JSON.stringify(purchases), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
