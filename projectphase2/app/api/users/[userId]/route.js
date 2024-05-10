import ecommRepo from "@/app/repo/ecommRepo";

export async function GET(request, { params }) {
    const userId = params.userId;
    const user = await ecommRepo.getUser(userId)
    return Response.json(user, { status: 200 });
}

export async function PUT(request, { params }) {
    const userId = params.userId;
    const user = await ecommRepo.getUser(userId)
    const updatedUser = await ecommRepo.updateUser(userId,user)
    return Response.json(updatedUser)
}