import ecommRepo from "@/app/repo/ecommRepo";

export async function GET(request){

    const products = await ecommRepo.getTopProducts();
    return Response.json(products)
}