import { ProductId } from "../core/product";
import { useDependencies } from "../infrastructure/deps";

export function useDeleteProduct(productId: ProductId) {
    const {productRepository} = useDependencies();

    return productRepository.deleteProduct(productId);
}