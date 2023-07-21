import { Collection, getRepository as getFirestoreRepository, IRepository} from 'fireorm';
import { from, Observable } from 'rxjs';
import { Product } from '../core/product';
import { CreateProductDto, ProductRepository, UpdateProductDto } from '../infrastructure/product-repository';

@Collection('Products')
class SaveableProduct extends Product { }

export class FireProductRepository implements ProductRepository {
    private _firebaseRepository: IRepository<SaveableProduct>;

    constructor() {
        this._firebaseRepository = getFirestoreRepository(SaveableProduct);
    }

    createProduct(dto: CreateProductDto): Observable<Product> {
        throw new Error('Method not implemented.');
    }

    updateProduct(dto: UpdateProductDto): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    getProductsForUser(userId: string): Observable<Product[]> {
        return from(this._firebaseRepository.find());
    }

    getProducts(): Observable<Product[]> {
        return from(this._firebaseRepository.find());
    }
}