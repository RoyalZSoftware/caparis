import { Observable } from "rxjs";

export interface ProductData {
    ean: string;
    name: string;
    imageUrl?: string;
    manufacturer?: string;
    isVegan?: boolean;
}

export interface OpenFoodFactApi {
    getProductByEAN(code: string): Observable<ProductData>;
}