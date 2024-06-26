import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, {params}){
    const brandName = params.brandName;
    const products = await ecomRepo.getproductsbyBrand(brandName);
    console.log(params)
    return Response.json(products, {status: 200})
}