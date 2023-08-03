import { Dependencies } from "@caparis/core";
import { AppwriteProductRepository } from "./product-repository";
import { AppWriteUserRepository } from "./user-repository";

export const AppWriteDependencies = (databaseId: string, productCollectionId: string): Dependencies => {

    const userRepository = new AppWriteUserRepository();
    const productRepository = new AppwriteProductRepository(databaseId, productCollectionId, userRepository);

    return {
        productRepository,
        userRepository,
    };
};