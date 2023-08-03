import { ID, Query } from "appwrite";
import { from, map, Observable, of, tap } from "rxjs";
import { Product, ProductId, ProductRepository, UpdateProductPayload, ProductFilter, UserRepository } from "@caparis/core";
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
    constructor(private _databaseId: string, private _collectionId: string, private _userRepository: UserRepository) {
    }

    deleteProduct(productId: ProductId): Observable<void> {
        return from(AppWriteClient.provider().database.deleteDocument(this._databaseId, this._collectionId, productId.value)).pipe(map(void 0));
    }
    getProduct(productId: ProductId): Observable<Product | null> {
        return from(AppWriteClient.provider().database.getDocument(this._databaseId, this._collectionId, productId.value)).pipe(map(c => this.fromDocumentToProduct(c)));
    }
    getProducts(): Observable<Product[]> {
        return this.filterProducts({ query: '', nameSort: 'ASC'});
    }
    createProduct(dto: Product): Observable<any> {
        return from(AppWriteClient.provider().database.createDocument(this._databaseId, this._collectionId, ID.unique(), dto));
    }
    updateProduct(productId: ProductId, alteredProduct: UpdateProductPayload): Observable<boolean> {
        throw new Error("Test");
    }

    filterProducts(productFilter: ProductFilter): Observable<Product[]> {
        const filter = [
            Query.orderAsc("name"),
            Query.equal("createdById", [this._userRepository?.currentUser$?.value?.uid]),
        ];

        if (productFilter.query) {
            filter.push(Query.equal("name", productFilter.query));
        }

        return from(AppWriteClient.provider().database.listDocuments(this._databaseId, this._collectionId, filter)).pipe(
            map(c => c.documents.map(
                document => this.fromDocumentToProduct(document)
            )),
        );
    }

    private fromDocumentToProduct(document: any) {
        const d = document as any;
        const product = new Product(d.createdById, d.name, d.quantity, d.productIdentifier, new Date(d.expiryDate));
        product.id = new ProductId(d.$id);
        return product;

    }
}