import { getRepository as getFirestoreRepository, IRepository} from 'fireorm';
import { from, Observable } from 'rxjs';
import { Product } from '../core/product';
import { ProductRepository, UpdateProductDto } from '../infrastructure/product-repository';

export class FireProductRepository implements ProductRepository {
    private _firebaseRepository: IRepository<Product>;

    constructor() {
        this._firebaseRepository = getFirestoreRepository(Product);
    }

    createProduct(dto: Product): Observable<Product> {
        alert(JSON.stringify(dto));
        return from(this._firebaseRepository.create(dto));
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