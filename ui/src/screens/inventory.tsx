import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BaseLayout from "../smart-components/base-layout";
import { useFilterProducts } from "@caparis/core";
import { InventoryListItem } from "../smart-components/product-list-item";
import { theme, Input } from "@caparis/ui-components";

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
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [query, setQuery] = useState();

    useEffect(() => {
        useFilterProducts(query).subscribe((products) => {
            setFetchedProducts(products);
        });
    }, [query]);

    const filter = ['All', 'Use Now', 'Vegan', 'Non-Vegan'];

    return <BaseLayout headerChild={<FilterBar onChange={(quer) => {
        setQuery(quer);
    }}></FilterBar>}>
        <Text style={{ ...theme.fonts.listItem, padding: theme.spacing.s }}>Filter list by</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            {filter.map(c =>
                <FilterChip style={{ marginRight: theme.spacing.s }}>{c}</FilterChip>
            )}
        </View>
        <Text style={{ ...theme.fonts.listItem, padding: theme.spacing.s, marginTop: theme.spacing.m }}>All Inventory List</Text>
        <ScrollView style={{height: 0, display: 'flex'}}>
            {fetchedProducts.map(c => <InventoryListItem product={c}></InventoryListItem>)}
        </ScrollView>
    </BaseLayout>
}