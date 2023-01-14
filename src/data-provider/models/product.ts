import { Collection, getRepository as gFR } from "fireorm";
import { getRepository } from '../../infrastructure/mockable-repository';
import { from } from "rxjs";
import { UserScopedModel } from "./user-scoped";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

@Collection('Products')
export class Product extends UserScopedModel {
    public id: string;
    public name: string;
    public barcodeIdentifier: string;
    public expiryDate: Date;
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