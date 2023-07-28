import { Dependencies } from "@caparis/core";
import { AppwriteProductRepository } from "./product-repository";
import { AppWriteUserRepository } from "./user-repository";

export const AppWriteDependencies = (databaseId: string, productCollectionId: string): Dependencies => ({
    productRepository: new AppwriteProductRepository(databaseId, productCollectionId), 
    userRepository: new AppWriteUserRepository(),
});