import { useFilterProducts } from "@caparis/core";
import { theme } from "@caparis/ui-components/src";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import BaseLayout from "../smart-components/base-layout";
import { ExpireNextProductListItem } from "../smart-components/product-list-item";
import { ExpireNextWidget } from "../smart-components/widgets/expire-next";

export default function HomeScreen() {
    const [fetchedProducts, setFetchedProducts] = useState([]);

    useEffect(() => {
        useFilterProducts('').subscribe((products) => {
            setFetchedProducts(products);
        });
    }, []);

    return (
        <BaseLayout headerChild={<ExpireNextWidget expireNext={fetchedProducts}></ExpireNextWidget>}>
            <Text style={{ ...theme.fonts.filter, padding: theme.spacing.s }}>Recipes with expiring food</Text>
            <ScrollView style={{ height: 0, display: 'flex' }}>
                {fetchedProducts.map(c => new ExpireNextProductListItem({ item: c }).render())}
            </ScrollView>
        </BaseLayout>
    );

}