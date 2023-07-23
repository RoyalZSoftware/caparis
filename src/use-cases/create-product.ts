import { Product } from "../core/product";
import { useDependencies } from "../infrastructure/deps";

export function useCreateProduct() {
    const {productRepository, userRepository} = useDependencies();
    
    return (name: string, quantity: number) => productRepository.createProduct( new Product(userRepository.currentUser.uid, name, quantity));
}