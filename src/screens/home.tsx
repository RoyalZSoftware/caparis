import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useProductProvider } from "../data-provider/models/product";
import { theme } from "../infrastructure/theme";
import { UserContext } from "../infrastructure/user-context";
import BaseLayout from "../components/base-layout";
import { ExpireNextProductListItem, RecipeListItem } from "../components/product-list-item";
import { Text } from "../components/text";
import { ExpireNextWidget } from "../components/widgets/expire-next";

export default function HomeScreen() {

    const [products, setProducts] = useState([]);

    const { user } = useContext(UserContext);
    const { getAllProductsForUser } = useProductProvider();

    useEffect(() => {
        getAllProductsForUser(user.uid).subscribe(retrievedProducts => {
            setProducts(retrievedProducts)});
    }, [])

    return (
        <BaseLayout headerChild={
            <ExpireNextWidget expireNext={products.filter(product => product.willExpireSoon)}></ExpireNextWidget>
        }>
            <Text type='default' style={{ marginBottom: theme.spacing.m }}>Start cooking with this ingredients today</Text>
            <FlatList data={products.sort(c => c.expiryDate)} renderItem={(({ item }) => <ExpireNextProductListItem item={item}></ExpireNextProductListItem>)}></FlatList>
        </BaseLayout>
    )
}