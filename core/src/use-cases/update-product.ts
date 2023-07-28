import { Context } from "../deps";
import { ProductId } from "../models/product";
import { UpdateProductPayload } from "../repositories/product-repository";

export function useUpdateProduct(productId: ProductId, alteredProduct: UpdateProductPayload) {
    const {productRepository} = Context.Dependencies;

    return productRepository.updateProduct(productId, alteredProduct);
}