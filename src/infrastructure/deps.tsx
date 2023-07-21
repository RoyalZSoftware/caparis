import { createContext, useContext, useState } from "react";
import { FireProductRepository } from "../fireorm/fire-product-repository";
import { ProductRepository } from "./product-repository";
import { UserRepository } from "./user-repository";

type Dependencies = {
    productRepository: ProductRepository,
    userRepository: UserRepository,
};

const DataLayerContext = createContext<Dependencies>({
    productRepository: null,
    userRepository: null,
});

export function DataLayerContextProvider() {
    const [productRepository] = useState(new FireProductRepository());
    const [userRepository] = useState<UserRepository>({currentUser: null});

    return <DataLayerContext.Provider value={{productRepository, userRepository}}></DataLayerContext.Provider>;
}

export function useDependencies() {
    return useContext(DataLayerContext);
}