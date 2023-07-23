import { Product, ProductId } from "../core/product";
import { useDependencies } from "../infrastructure/deps";
import { UpdateProductPayload } from "../infrastructure/product-repository";

export function useUpdateProduct(productId: ProductId, alteredProduct: UpdateProductPayload) {
    const {productRepository} = useDependencies();

    return productRepository.updateProduct(productId, alteredProduct);
}