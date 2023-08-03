import { useFilterProducts } from "@caparis/core";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { ExpireNextProductListItem } from "../../shared/product-list-item";
import { Route, useRouter } from "../../shared/router";
import { theme } from "../../shared/theme";
import { DetailsRoute } from "./details";

export default function HomeScreen() {
    const [fetchedProducts, setFetchedProducts] = useState([]);

    useEffect(() => {
        useFilterProducts('').subscribe((products) => {
            setFetchedProducts(products);
        });
    }, []);

    const {navigateTo} = useRouter();
    return (
        <>
            <Text style={{ ...theme.fonts.filter, padding: theme.spacing.s }}>Recipes with expiring food</Text>
            <ScrollView style={{ height: 0, display: 'flex' }}>
                {fetchedProducts.map(c => <Pressable onPress={() => {
                    navigateTo(DetailsRoute, {product: c});
                }}>{new ExpireNextProductListItem({ item: c }).render()}</Pressable>)}
            </ScrollView>
        </>
    );

}

export const HomeRoute: Route = {
    render: <HomeScreen></HomeScreen>,
    url: '/home',
    title: 'Home'
}
