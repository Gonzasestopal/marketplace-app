import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();
    const filterByUser = {
        include: {
            avatar: true,
        },
        where: {
            email: body.email
        }
    }

    const userWithAvatar = await prisma.user.findFirstOrThrow(filterByUser)

    return NextResponse.json(userWithAvatar);
}

