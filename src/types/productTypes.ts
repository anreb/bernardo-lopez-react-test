export interface Rating {
    rate: number | string;
    count: number | string;
}

export interface Product {
    id?: number | undefined;
    title: string;
    price: number | string;
    description: string;
    category: string;
    image: string;
    rating?: Rating;
}