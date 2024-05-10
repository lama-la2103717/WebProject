import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, {params}){
    const brandName = params.brandName;
    console.log(params)
    const purchase = await ecomRepo.getSaleHistory(brandName);
    return Response.json(purchase, {status: 200})
}