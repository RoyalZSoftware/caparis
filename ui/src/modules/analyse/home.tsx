import { useFilterProducts } from "@caparis/core";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { useCaparisApp } from "../../shared/caparis-app-context";
import { ExpireNextProductListItem } from "../../shared/product-list-item";
import { useRouter } from "../../shared/router";
import { theme } from "../../shared/theme";
import { DetailsRoute } from "./routes";

export default function HomeScreen() {
    const [fetchedProducts, setFetchedProducts] = useState([]);

    const app = useCaparisApp();

    useEffect(() => {
        useFilterProducts('', app).subscribe((products) => {
            setFetchedProducts(products);
        });
    }, []);

    const {push} = useRouter();
    return (
        <>
            <Text style={{ ...theme.fonts.filter, padding: theme.spacing.s }}>Recipes with expiring food</Text>
            <ScrollView style={{ height: 0, display: 'flex' }}>
                {fetchedProducts.map(c => <Pressable onPress={() => {
                    push(DetailsRoute, {product: c});
                }}>{new ExpireNextProductListItem({ item: c }).render()}</Pressable>)}
            </ScrollView>
        </>
    );

}
