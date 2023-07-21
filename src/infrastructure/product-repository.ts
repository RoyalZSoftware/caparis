import { Observable } from "rxjs";
import { Product } from "../core/product";

export class ProductId {
    constructor(public id: string) { }
}

export class UpdateProductDto {
    constructor(public id: ProductId) { }
}

export class CreateProductDto {
    constructor(public name: string, public productIdentifier: string, public expiryDate: Date, public createdById: string) { }
}

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    getProductsForUser(userId: string): Observable<Product[]>;
    createProduct(dto: CreateProductDto): Observable<Product>;
    updateProduct(dto: UpdateProductDto): Observable<boolean>;
}