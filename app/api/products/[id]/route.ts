import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { NextRequest } from "next/server";

type GetProductParam = {
    id: number
}

export async function GET(_: NextRequest, { params }: { params: GetProductParam }) {
    const filterByProduct = {
        where: {
            id: Number(params.id),
        }
    }
    const product = await prisma.product.findFirstOrThrow(filterByProduct)

    return NextResponse.json(product);
}
