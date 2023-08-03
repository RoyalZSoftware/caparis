import { Observable, of } from "rxjs";
import { OpenFoodFactApi } from ".";
import { ProductData } from "./open-food-fact-api";

export class DummyClient implements OpenFoodFactApi {
    getProductByEAN(code: string): Observable<ProductData> {
        return of({name: 'Test', imageUrl: '', ean: code});
    }
}