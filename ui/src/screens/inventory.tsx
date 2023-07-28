import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import BaseLayout from "../components/base-layout";
import List from "../components/list";
import { useFilterProducts } from "@caparis/core";
import { ExpireNextProductListItem } from "../components/product-list-item";
import { theme } from "../components/theme";

function useFilterBar() {
    const [query, setQuery] = useState('');

    return {
        query, Component: () => <TextInput value={query} onChangeText={val => setQuery(val)} style={{
            ...theme.fonts.primary,
            borderRadius: 50,
            backgroundColor: theme.colors.background,
            height: 50,
            borderWidth: 2,
            borderColor: theme.colors.secondary,
            padding: theme.spacing.m
        }} placeholder={'Search product'}></TextInput>
    };
}

function FilterChip({ children, style }: { children: any, style?: any }) {
    return <Pressable style={{ backgroundColor: theme.colors.primary, padding: theme.spacing.sm, borderRadius: 25, display: 'flex', ...style }}>
        <Text style={{ color: theme.colors.background, ...theme.fonts.listItem }}>{children}</Text>
    </Pressable>
}

export function InventoryScreen() {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const { setCurrentFilter, loading } = {
        setCurrentFilter: () => { },
        loading: false,
    }

    const { Component: FilterBar, query } = useFilterBar();

    useEffect(() => {
        useFilterProducts(query).subscribe((products) => {
            setFetchedProducts(products);
        });
    }, [query]);

    const filter = ['All', 'Use Now', 'Vegan', 'Non-Vegan'];

    return <BaseLayout headerChild={<FilterBar></FilterBar>}>
        <Text style={{ ...theme.fonts.listItem, padding: theme.spacing.s }}>Filter list by</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            {filter.map(c =>
                <FilterChip style={{ marginRight: theme.spacing.s }}>{c}</FilterChip>
            )}
        </View>
        <Text style={{ ...theme.fonts.listItem, padding: theme.spacing.s, marginTop: theme.spacing.m }}>All Inventory List</Text>
        <List loading={loading} items={fetchedProducts.map(c => new ExpireNextProductListItem({ item: c }))}></List>
    </BaseLayout>
}