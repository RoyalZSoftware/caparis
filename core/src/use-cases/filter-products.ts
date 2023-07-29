import { Observable } from "rxjs";
import { Context } from "../deps";
import { Product } from "../models/product";

export function useFilterProducts(query: string): Observable<Product[]> {
    const {productRepository} = Context.Dependencies;

    return productRepository.filterProducts({query, sort: 'DESC'});
}