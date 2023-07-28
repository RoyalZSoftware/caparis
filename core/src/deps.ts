import { ProductRepository } from "./repositories/product-repository";
import { EmailPasswordLoginProvider, UserRepository } from "./repositories/user-repository";

export type Dependencies = {
    productRepository: ProductRepository,
    userRepository: UserRepository | UserRepository & EmailPasswordLoginProvider,
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