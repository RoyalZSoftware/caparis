import { Observable } from "rxjs";
import { Product } from "../core/product";

export class ProductId {
    constructor(public id: string) { }
}

export class UpdateProductDto {
    constructor(public id: ProductId) { }
}

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    getProductsForUser(userId: string): Observable<Product[]>;
    createProduct(dto: Product): Observable<Product>;
    updateProduct(dto: UpdateProductDto): Observable<boolean>;
}