import { NextResponse } from "next/server";
import Product from "./schema";

const products: Product[] = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        images: [{
            src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            alt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        }],
        categories: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Clothing', href: '#' },
        ],
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        images: [{
            src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            alt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        }],
        categories: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Clothing', href: '#' },
        ],
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        images: [{
            src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
            alt: 'Person using a pen to cross a task off a productivity paper card.',
        }],
        categories: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Clothing', href: '#' },
        ],
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        images: [{
            src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            alt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        }],
        categories: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Clothing', href: '#' },
        ],
    },
    // More products...
]

export async function GET() {
    return NextResponse.json(products);
}
