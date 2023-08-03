import { Observable } from "rxjs";
import { CaparisApp } from "../app";
import { Product } from "../models/product";

export function useFilterProducts(query: string, context: CaparisApp): Observable<Product[]> {
    const {productRepository} = context.Dependencies;

    return productRepository.filterProducts({query, nameSort: 'DESC'});
}