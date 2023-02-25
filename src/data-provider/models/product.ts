import { Collection} from "fireorm";
import { getRepository } from '../../infrastructure/mockable-repository';
import { from } from "rxjs";
import { differenceInDays} from 'date-fns';
import { UserScopedModel } from "./user-scoped";


@Collection('Products')
export class Product extends UserScopedModel {
    public id: string;
    public name: string;
    public productIdentifier: string;
    public expiryDate: Date;
    public quantity: number;

    public static create(configuration: Partial<{[Key in keyof Product]: any}>) {
        const product = new Product();

        Object.assign(product, configuration);

        return product;
    }

    public get willExpireSoon(): boolean {
        return this._calculateDaysBetweenExpiryAndNow() <= 3;
    }

    protected _calculateDaysBetweenExpiryAndNow(): number {
        return differenceInDays(this.expiryDate, new Date(Date.now())) + 1;
    }

    public decorate() {
        return new ProductPresenter(this);
    }
}

class ProductPresenter extends Product {
    
    constructor(public product: Product) {
        super()
        Object.assign(this, product);
    }

    public get expiryDateColor(): 'error' | 'primary' {
        return this.product.willExpireSoon ? 'error' : 'primary';
    }

    public get expireInDays(): number {
        return this._calculateDaysBetweenExpiryAndNow();
    }
}

export function useProductProvider() {
    const repository = getRepository(Product);

    const getAllProductsForUser = (userUid: string, limit: number = 100) => {
        console.log(userUid);
        return from(repository.limit(limit).whereEqualTo('createdById', userUid).find());
    }

    const createProduct = (product: Product) => {
        return from(repository.create(product));
    }

    return { getAllProductsForUser, createProduct };
}