import { ProductRepository } from "./repositories/product-repository";
import { UserRepository } from "./repositories/user-repository";

export type Dependencies = {
    productRepository: ProductRepository,
    userRepository: UserRepository,
};

export class CaparisApp {
    constructor(private _dependencies: Dependencies) { }
    public get Dependencies(): Dependencies {
        return this._dependencies;
    }
}