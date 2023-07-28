import { Observable, of } from "rxjs";
import { Product, ProductId } from "../../src/core/src/models/product";
import { ProductRepository, UpdateProductPayload } from "../../src/infrastructure/product-repository";

export class DummyProductRepository implements ProductRepository {
    getProducts(): Observable<Product[]> {
        const product = new Product('001', "Tomato", 1, "Tomato");
        product.id = new ProductId("001");
        return of([
            product,
            product,
            product,
        ]);
    }
    getProductsForUser(userId: string): Observable<Product[]> {
        return this.getProducts();
    }
    createProduct(dto: Product): Observable<Product> {
        throw new Error("Method not implemented.");
    }
    updateProduct(productId: ProductId, dto: UpdateProductPayload): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(productId: ProductId): Observable<void> {
        throw new Error("Method not implemented.");
    }

}