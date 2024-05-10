import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request) {
    
    const products = await ecomRepo.getProducts();
    return Response.json(products, { status: 200 })
}
export async function POST(request){
    const data = await request.json()
    const product = await ecomRepo.addProduct(data);
    return Response.json(product, {status: 200})
}