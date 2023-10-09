import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const newUser = { data: { email: body.email, externalId: body.externalId, name: body.name } }

    const user = await prisma.user.create(newUser)

    const newAvatar = {
        data: {
            url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            userId: user.id,
            description: 'profile photo',
        }
    }

    await prisma.avatar.create(newAvatar)

    return NextResponse.json(user);
}
