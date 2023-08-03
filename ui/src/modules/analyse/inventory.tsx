import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Product, useFilterProducts } from "@caparis/core";
import { InventoryListItem } from "../../shared/product-list-item";
import { theme } from "../../shared/theme";
import Input from "../../shared/input";
import { useRouter } from "../../shared/router";
import { useCaparisApp } from "../../shared/caparis-app-context";
import { DetailsRoute } from "./routes";

function FilterBar({ onChange }) {
    const [query, setQuery] = useState('');

    return <Input value={query} onChangeText={val => setQuery(val)} style={{
        ...theme.fonts.primary,
        borderRadius: 50,
        backgroundColor: theme.colors.background,
        height: 50,
        borderWidth: 2,
        borderColor: theme.colors.secondary,
        padding: theme.spacing.m
    }} placeholder={'Search product'}></Input>;

}

function FilterChip({ children, style }: { children: any, style?: any }) {
    return <Pressable style={{ backgroundColor: theme.colors.primary, padding: theme.spacing.sm, borderRadius: 25, display: 'flex', ...style }}>
        <Text style={{ color: theme.colors.background, ...theme.fonts.listItem }}>{children}</Text>
    </Pressable>
}

export function InventoryScreen() {
    const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
    const { push } = useRouter();
    const [query] = useState();
    const app = useCaparisApp();

    useEffect(() => {
        useFilterProducts(query, app).subscribe((products) => {
            setFetchedProducts(products);
        });
    }, [query]);

    const filter = ['All', 'Use Now', 'Vegan', 'Non-Vegan'];

    return <>
        <Text style={{ ...theme.fonts.listItem, padding: theme.spacing.s }}>Filter list by</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            {filter.map(c =>
                <FilterChip style={{ marginRight: theme.spacing.s }}>{c}</FilterChip>
            )}
        </View>
        <Text style={{ ...theme.fonts.listItem, padding: theme.spacing.s, marginTop: theme.spacing.m }}>All Inventory List</Text>
        <ScrollView style={{ height: 0, display: 'flex' }}>
            {fetchedProducts.map(c => <Pressable onPress={() => push(DetailsRoute, {product: c})}>
                <InventoryListItem product={c}></InventoryListItem></Pressable>)}
        </ScrollView>
    </>
}
