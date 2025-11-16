// src/types/product.ts
export interface Product {
    id: number
    name: string
    description: string
    price: number
    images: string[]     // один или несколько снимков
    available: boolean
}
