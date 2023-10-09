import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import { Photo } from "@prisma/client";
import { NextRequest } from "next/server";

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



export async function POST(request: NextRequest) {
    const accessToken = request.headers.get("Authorization")?.split(' ')[1];
    if (!accessToken) {
        return NextResponse.json({ error: "Missing JWT" }, { status: 403 });
    }

    const filterByUser = {
        where: {
            externalId: accessToken,
        }
    }

    const user = await prisma.user.findFirstOrThrow(filterByUser)

    const body = await request.json();
    const newProduct = { data: { name: body.name, description: body.description, price: body.price, userId: user.id } }

    const product = await prisma.product.create(newProduct)

    const availablePhotos = [
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-06.jpg",
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg",
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-05.jpg"
    ]

    const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];

    const newPhoto = {
        data: {
            url: randomPhoto,
            productId: product.id,
            description: 'profile photo',
        }
    }

    const photo = await prisma.photo.create(newPhoto)

    return NextResponse.json(product);
}
