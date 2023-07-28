import { Context } from "../deps";
import { ProductId } from "../models/product";

export function useDeleteProduct(productId: ProductId) {
    const {productRepository} = Context.Dependencies;

    return productRepository.deleteProduct(productId);
}