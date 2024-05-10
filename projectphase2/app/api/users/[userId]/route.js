import ecomRepo from "@/app/repo/ecomRepo";

export async function GET(request, { params }) {
    const userId = params.userId;
    const user = await ecomRepo.getUser(userId)
    return Response.json(user, { status: 200 });
}

export async function PUT(request, { params }) {
    const userId = params.userId;
    const user = await ecomRepo.getUser(userId)
    const updatedUser = await ecomRepo.updateUser(userId,user)
    return Response.json(updatedUser)
}