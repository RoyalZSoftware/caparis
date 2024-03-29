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
    getProduct(productId: ProductId): Observable<Product | null>;
    filterProducts(productFilter: ProductFilter): Observable<Product[]>;
    createProduct(dto: Product): Observable<Product>;
    updateProduct(productId: ProductId, dto: UpdateProductPayload): Observable<boolean>;
    deleteProduct(productId: ProductId): Observable<void>;
}