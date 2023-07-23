import { Observable } from "rxjs";
import { Product, ProductId } from "../core/product";

export type UpdateProductPayload = Omit<Product, 'id'>;

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    getProductsForUser(userId: string): Observable<Product[]>;
    createProduct(dto: Product): Observable<Product>;
    updateProduct(productId: ProductId, dto: UpdateProductPayload): Observable<boolean>;
    deleteProduct(productId: ProductId): Observable<void>;
}