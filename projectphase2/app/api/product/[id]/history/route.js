import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, {params}){
    const id = params.id;
    console.log(params)
    const purchase = await ecomRepo.getSaleHistoryById(id);
    return Response.json(purchase, {status: 200})
}