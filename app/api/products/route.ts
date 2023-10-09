import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { Photo } from "@prisma/client";

export type ProductWithPhotos = {
    id: string
    name: string
    price: number
    photos: Photo[]
}


export async function GET() {
    const productswithPhotos = await prisma.product.findMany({
        include: {
            photos: true
        }
    })

    return NextResponse.json(productswithPhotos);
}
