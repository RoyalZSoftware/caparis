import { ID, Query } from "appwrite";
import { from, map, Observable } from "rxjs";
import { Product, ProductId } from "../core/product";
import { ProductRepository, UpdateProductPayload } from "../infrastructure/product-repository";
import { AppWriteClient } from "./appwrite";

export class AppwriteProductRepository implements ProductRepository {
    
    constructor(private _databaseId: string, private _collectionId: string) { }

    deleteProduct(productId: ProductId): Observable<void> {
        return from(AppWriteClient.provider().database.deleteDocument(this._databaseId, this._collectionId, productId.value)).pipe(map(void 0));
    }
    getProducts(): Observable<Product[]> {
        return from(AppWriteClient.provider().database.listDocuments(this._databaseId, this._collectionId, [
            Query.orderAsc("name"),
        ])).pipe(
            map(c => c.documents.map(
                document => {
                    const d = document as any;
                    const product = new Product(d.createdById, d.name, d.quantity, d.productIdentifier, new Date(d.expiryDate));
                    product.id = new ProductId(d.$id);
                    return product;
                }
            )),
        );
    }
    getProductsForUser(userId: string): Observable<Product[]> {
        return this.getProducts();
    }
    createProduct(dto: Product): Observable<any> {
        return from(AppWriteClient.provider().database.createDocument(this._databaseId, this._collectionId, ID.unique(), dto));
    }
    updateProduct(productId: ProductId, alteredProduct: UpdateProductPayload): Observable<boolean> {
        throw new Error("Test");
    }
}