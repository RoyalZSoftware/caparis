import { ProductRepository } from "./repositories/product-repository";
import { UserRepository } from "./repositories/user-repository";

export type Dependencies = {
    productRepository: ProductRepository,
    userRepository: UserRepository,
};

export class Context {
    private static _dependencies: Dependencies;
    public static setup(dependencies: Dependencies) {
        this._dependencies = dependencies;
    }
    public static get Dependencies(): Dependencies {
        return this._dependencies;
    }
}