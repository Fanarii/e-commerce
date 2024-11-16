export interface Brand {
    id: number;
    name: string;
    products: [];
    createdAt: Date;
}

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    sku?: string;
    stockQuantity: number;
    imageUrl?: string;
    category: Category;
    brand: Brand;
    variations: ProductVariation[];
    reviews: ProductReview[];
}

export interface ProductVariation {
    id: number;
    name: string;
    value: string;
}

export interface ProductReview {
    id: number;
    username: string;
    rating: number;
    comment: string;
}