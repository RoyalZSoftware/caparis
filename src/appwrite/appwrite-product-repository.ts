import { ID, Query } from "appwrite";
import { from, map, Observable } from "rxjs";
import { Product } from "../core/product";
import { ProductId, ProductRepository } from "../infrastructure/product-repository";
import { AppWriteClient } from "./appwrite";

export class AppwriteProductRepository implements ProductRepository {
    
    constructor(private _databaseId: string, private _collectionId: string) { }

    getProducts(): Observable<Product[]> {
        return from(AppWriteClient.provider().database.listDocuments(this._databaseId, this._collectionId, [
            Query.orderAsc("name"),
        ])).pipe(
            map(c => c.documents.map(
                document => {
                    const d = document as any;
                    return new Product(d.createdById, d.name, d.quantity, d.productIdentifier, new Date(d.expiryDate));
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
    updateProduct(productId: ProductId, dto: Product): Observable<boolean> {
        throw new Error("Test");
    }
}