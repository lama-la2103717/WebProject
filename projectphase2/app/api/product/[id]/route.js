import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, {params}){
    const id = params.id;
    const products = await ecomRepo.getProductById(id);
    return Response.json(products, {status: 200})
}

export async function PUT(request, {params}){
    const id = params.id;
    const data = await request.json();
    const newProd = await ecomRepo.updateProduct(id, data);
    return Response.json(newProd,{status:200})
}