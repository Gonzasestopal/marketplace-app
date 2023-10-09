import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { NextRequest } from "next/server";
import { Avatar } from "@prisma/client";

type GetUserParam = {
    id: string
}

export type UserWithAvatar = {
    id: string
    name: string
    email: string
    avatar: Avatar[]
}

export async function GET(request: NextRequest, { params }: { params: GetUserParam }) {
    const accessToken = request.headers.get("Authorization")?.split(' ')[1];
    if (!accessToken) {
        return NextResponse.json({ error: "Missing JWT" }, { status: 403 });
    }
    const filterByUser = {
        include: {
            avatar: true,
        },
        where: {
            id: Number(params.id),
        }
    }

    const userWithAvatar = await prisma.user.findFirstOrThrow(filterByUser)

    if (userWithAvatar.externalId != accessToken) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(userWithAvatar);
}
