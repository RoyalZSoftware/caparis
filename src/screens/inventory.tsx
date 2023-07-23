import { useEffect, useState } from "react";
import { Text } from "react-native";
import BaseLayout from "../components/base-layout";
import Button from "../components/button";
import List from "../components/list";
import { ExpireNextProductListItem, ProductListItemBase } from "../components/product-list-item";
import { Product } from "../core/product";
import { useDependencies } from "../infrastructure/deps";

export default function Inventory() {

    const [loading, setLoading] = useState(true);

    const {productRepository, userRepository} = useDependencies();
    const user = userRepository?.currentUser;

    const [allProducts, setAllProducts] = useState([]);

    const refreshProductList = () => {
        if (user)
            productRepository.getProductsForUser(user.uid)
                .subscribe((products) => {
                    setAllProducts(products.map(c => new ExpireNextProductListItem({item: c})));
                    setLoading(false);
                });
    }

    const createProduct = (name: string, expiryDate: Date) => {
        const product = new Product(user.uid, name, 10, '', expiryDate);

        productRepository.createProduct(product).subscribe(() => {
            refreshProductList();
        });
    }

    useEffect(refreshProductList, []);

    if (loading) return (<Text>Loading..</Text>);

    return (
        <BaseLayout>
            <Button onPress={() => createProduct('Nix', new Date())} title={"New"}></Button>
            <List items={allProducts}></List>
        </BaseLayout>
    );

}