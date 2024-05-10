import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, {params}){
    const id = params.username;
    console.log(params)
    const purchase = await ecomRepo.getCustomerHistoryByName(id);
    return Response.json(purchase, {status: 200})
}