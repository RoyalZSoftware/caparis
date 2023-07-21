import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { theme } from "../components/theme";
import BaseLayout from "../components/base-layout";
import { ExpireNextProductListItem } from "../components/product-list-item";
import { Text } from "../components/text";
import { ExpireNextWidget } from "../components/widgets/expire-next";
import { useDependencies } from "../infrastructure/deps";

const getProducts = () => {
    const [products, setProducts] = useState([]);
    
    const { productRepository, userRepository } = useDependencies();

    useEffect(() => {
        productRepository.getProductsForUser(userRepository.currentUser.uid).subscribe(retrievedProducts => {
            setProducts(retrievedProducts)});
    }, [])

    return products;
}

export default function HomeScreen() {

    const products = getProducts();

    return (
        <BaseLayout headerChild={
            <ExpireNextWidget expireNext={products.filter(product => product.willExpireSoon)}></ExpireNextWidget>
        }>
            <Text type='default' style={{ marginBottom: theme.spacing.m }}>Start cooking with this ingredients today</Text>
            <FlatList data={products.sort(c => c.expiryDate)} renderItem={(({ item }) => <ExpireNextProductListItem item={item}></ExpireNextProductListItem>)}></FlatList>
        </BaseLayout>
    )
}