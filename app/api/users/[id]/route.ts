import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { NextRequest } from "next/server";
import { Avatar } from "@prisma/client";

type GetUserParam = {
    id: number
}

export type UserWithAvatar = {
    id: string
    name: string
    email: string
    avatar: Avatar[]
}

export async function GET(_: NextRequest, { params }: { params: GetUserParam }) {
    const filterByUser = {
        include: {
            avatar: true,
        },
        where: {
            id: Number(params.id),
        }
    }

    const userWithAvatar = await prisma.user.findFirstOrThrow(filterByUser)

    console.log(userWithAvatar)

    return NextResponse.json(userWithAvatar);
}
