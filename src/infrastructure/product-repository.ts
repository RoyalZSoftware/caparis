import { Observable } from "rxjs";
import { Product } from "../core/product";

export class ProductId {
    constructor(public id: string) { }
}

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    getProductsForUser(userId: string): Observable<Product[]>;
    createProduct(dto: Product): Observable<Product>;
    updateProduct(productId: ProductId, dto: Omit<Product, 'id'>): Observable<boolean>;
}