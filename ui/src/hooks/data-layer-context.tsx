import { Context, Dependencies, ProductRepository, UserRepository } from "@caparis/core";
import { createContext, useState } from "react";

const DataLayerContext = createContext<Dependencies>({
    productRepository: null,
    userRepository: null,
});

export function DataLayerContextProvider({children}) {
    const [productRepository] = useState<ProductRepository>(Context.Dependencies.productRepository);
    const [userRepository] = useState<UserRepository>(Context.Dependencies.userRepository);

    return <DataLayerContext.Provider value={{productRepository, userRepository}}>{children}</DataLayerContext.Provider>;
}
