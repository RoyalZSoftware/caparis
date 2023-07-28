import { useFilterProducts } from "@caparis/core";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import BaseLayout from "../components/base-layout";
import List from "../components/list";
import { ExpireNextProductListItem } from "../components/product-list-item";
import { theme } from "../components/theme";
import { ExpireNextWidget } from "../components/widgets/expire-next";

export default function HomeScreen() {
    const [fetchedProducts, setFetchedProducts] = useState([]);

    useEffect(() => {
        useFilterProducts('').subscribe((products) => {
            setFetchedProducts(products);
        });
    }, []);

    return (
        <BaseLayout headerChild={<ExpireNextWidget expireNext={fetchedProducts}></ExpireNextWidget>}>
            <Text style={{...theme.fonts.filter, padding: theme.spacing.s}}>Recipes with expiring food</Text>
            <List loading={false} items={fetchedProducts.map(c => new ExpireNextProductListItem({item: c}))}></List>
        </BaseLayout>
    );

}