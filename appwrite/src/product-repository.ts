import { ID, Query } from "appwrite";
import { from, map, Observable, of, tap } from "rxjs";
import { Product, ProductId, ProductRepository, UpdateProductPayload } from "@caparis/core";
import { AppWriteClient } from "./appwrite";

class SimpleCache<T> {
    private _createdAt: Date;
    private _invalid: boolean = false;

    constructor(private _timeToLiveInSeconds = 300) {
        this._createdAt = new Date();
    }

    public items: T[];

    public invalidate() {
        this._invalid = true;
    }

    public isValid() {
        if (this._invalid) return false;
        const diffSinceCreatedAt = Math.abs(this._createdAt.getTime() - new Date().getTime()) / 1000;
        return diffSinceCreatedAt < this._timeToLiveInSeconds;
    }
}

export class AppwriteProductRepository implements ProductRepository {
    private _cache: SimpleCache<Product> = new SimpleCache<Product>(300);

    constructor(private _databaseId: string, private _collectionId: string) {
        this._cache.invalidate();
    }

    deleteProduct(productId: ProductId): Observable<void> {
        return from(AppWriteClient.provider().database.deleteDocument(this._databaseId, this._collectionId, productId.value)).pipe(map(void 0));
    }
    getProducts(): Observable<Product[]> {
        if (this._cache.isValid()) {
            return of(this._cache.items);
        }
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
            tap((items) => {
                this._cache = new SimpleCache<Product>();
                this._cache.items = items;
            }),
        );
    }
    getProductsForUser(userId: string): Observable<Product[]> {
        throw new Error('Not implemented');
    }
    createProduct(dto: Product): Observable<any> {
        return from(AppWriteClient.provider().database.createDocument(this._databaseId, this._collectionId, ID.unique(), dto));
    }
    updateProduct(productId: ProductId, alteredProduct: UpdateProductPayload): Observable<boolean> {
        throw new Error("Test");
    }
}