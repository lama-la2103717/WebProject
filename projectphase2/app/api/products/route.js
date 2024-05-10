import ecommRepo from "@/app/repo/ecommRepo";

export async function GET(request){

    if (searchParams.has('title')) {
        const name = searchParams.get('title');
        const products = await ecommRepo.getProductByTitle(title);
        return Response.json(products, { status: 200 });
    } 
    const products = await ecommRepo.getTopProducts();
    return Response.json(products)
}
