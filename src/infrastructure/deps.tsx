import { createContext, useContext, useState } from "react";
import { AppwriteProductRepository } from "../appwrite/appwrite-product-repository";
import { AppWriteUserRepository } from "../appwrite/appwrite-user-repository";
import { ProductRepository } from "./product-repository";
import { EmailPasswordLoginProvider, UserRepository } from "./user-repository";

type Dependencies = {
    productRepository: ProductRepository,
    userRepository: UserRepository | UserRepository & EmailPasswordLoginProvider,
};

const DataLayerContext = createContext<Dependencies>({
    productRepository: null,
    userRepository: null,
});

export function DataLayerContextProvider({children}) {
    const [productRepository] = useState(new AppwriteProductRepository("products", "products"));
    const [userRepository] = useState<UserRepository>(new AppWriteUserRepository());

    return <DataLayerContext.Provider value={{productRepository, userRepository}}>{children}</DataLayerContext.Provider>;
}

export function useDependencies() {
    return useContext(DataLayerContext);
}