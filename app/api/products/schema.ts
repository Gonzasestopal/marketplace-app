type Size = {
    name: string;
    inStock: boolean;
}

type Color = {
    name: string;
    class: string;
    selectedClass: string;
}

type Image = {
    alt: string
    src: string
}

type Category = {
    id: number;
    name: string;
    href: string;
}

type Product = {
    id: number;
    name: string;
    href: string;
    price: string;
    categories: Category[];
    images: Image[];
    colors?: Color[];
    highlights?: string[];
    details?: string;
    description?: string;
    sizes?: Size[];
}

export default Product;
