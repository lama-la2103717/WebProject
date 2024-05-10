import ecommRepo from "@/app/repo/ecommRepo";

export async function GET(request){

    const brands = await ecommRepo.getBrands();
    return Response.json(brands)
}