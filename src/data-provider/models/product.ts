import { Collection} from "fireorm";
import { getRepository } from '../../infrastructure/mockable-repository';
import { from } from "rxjs";
import { UserScopedModel } from "./user-scoped";
import { useContext } from "react";
import { UserContext } from "../../infrastructure/user-context";

@Collection('Product')
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
        return this.expireInDays <= 3;
    }

    public get expireInDays(): number {
        return this._calculateDaysBetweenExpiryAndNow();
    }

    private _calculateDaysBetweenExpiryAndNow() {
        const currentDate = new Date(Date.now()).getTime();
        
        const expiryDate = this.expiryDate.getTime();
        
        return expiryDate - currentDate;
    }
}


export function useProductProvider() {
    const repository = getRepository(Product);

    const {user} = useContext(UserContext);
    const getAllProductsForUser = (userUid: string = user.uid, limit?: number) => {
        return from(repository.limit(limit).whereEqualTo('createdById', userUid).find());
    }

    const createProduct = (product: Product) => {
        return from(repository.create(product));
    }

    return {getAllProductsForUser, createProduct};
}