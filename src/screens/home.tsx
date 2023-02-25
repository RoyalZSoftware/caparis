import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { tap } from "rxjs";
import { useProductProvider } from "../data-provider/models/product";
import { theme } from "../infrastructure/theme";
import { UserContext } from "../infrastructure/user-context";
import BaseLayout from "../components/base-layout";
import { RecipeListItem } from "../components/product-list-item";
import { Text } from "../components/text";
import { ExpireNextWidget } from "../components/widgets/expire-next";

export default function HomeScreen() {

    const [products, setProducts] = useState([]);


    const {getAllProductsForUser} = useProductProvider();

    useEffect(() => {
        getAllProductsForUser().pipe(tap((retrievedProducts) => {
            setProducts(retrievedProducts);
        })).subscribe();
    }, []);

    return (
        <BaseLayout headerChild={
            <ExpireNextWidget expireNext={products}></ExpireNextWidget>
        }>
            <Text type='default' style={{ marginBottom: theme.spacing.m }}>Recipes with expiring food</Text>
            <FlatList data={products} renderItem={(({ item }) => <RecipeListItem item={item}></RecipeListItem>)}></FlatList>
        </BaseLayout>
    )
}