import { Context } from "../deps";
import { Product } from "../models/product";

export function useCreateProduct() {
    const {productRepository, userRepository} = Context.Dependencies;
    
    return (name: string, quantity: number) => productRepository.createProduct( new Product(userRepository.currentUser$.value.uid, name, quantity));
}