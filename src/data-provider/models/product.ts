import { Collection, getRepository } from "fireorm";
import { from } from "rxjs";
import { UserScopedModel } from "./user-scoped";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

@Collection('Products')
export class Product extends UserScopedModel {

    public id: string;

    constructor(public name: string, public barcodeIdentifier: string, public expiryDate: Date, public createdById: string) {
        super();
    }
}

export function useProductProvider() {
    
    const repository = getRepository(Product);

    const getAllProductsForUser = (user: FirebaseAuthTypes.User, limit?: number) => {
        return from(repository.limit(limit).whereEqualTo('createdById', user.uid).find());
    }

    const createProduct = (product: Product) => {
        return from(repository.create(product));
    }

    return {getAllProductsForUser, createProduct};
}