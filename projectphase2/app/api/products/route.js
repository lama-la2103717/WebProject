import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request) {

    const products = await ecomRepo.getProducts();
    return Response.json(products, { status: 200 })
}