import { Component } from "react";
import { ScrollView, Text, View } from "react-native";

export abstract class ListItem<T> extends Component<{item: T}> {
    abstract render();
}

export interface ListProperties<T> {
    items: ListItem<T>[];
    loading: boolean;
};

export default function List<T>({items, loading}: ListProperties<T>) {
    if (loading)
        return <Text>Loading...</Text>;
    return (
        <ScrollView>
            {items.map(c => c.render())}
        </ScrollView>
    );
}