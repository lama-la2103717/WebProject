import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, {params}){
    const userId = params.userId;
    console.log(params)
    const purchase = await ecomRepo.getCustomerHistoryById(userId);
    return Response.json(purchase, {status: 200})
}