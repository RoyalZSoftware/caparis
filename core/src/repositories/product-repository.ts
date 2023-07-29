import { Observable } from "rxjs";
import { Product, ProductId } from "../models/product";

export type UpdateProductPayload = Omit<Product, 'id'>;

export interface ProductFilter {
    query?: string;
    nameSort?: 'ASC' | 'DESC';
}

export class DefaultProductFilter implements ProductFilter {
    query: string = "";
    nameSort: "ASC" | "DESC" = "ASC";
}

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    filterProducts(productFilter: ProductFilter): Observable<Product[]>;
    getProductsForUser(userId: string): Observable<Product[]>;
    createProduct(dto: Product): Observable<Product>;
    updateProduct(productId: ProductId, dto: UpdateProductPayload): Observable<boolean>;
    deleteProduct(productId: ProductId): Observable<void>;
}